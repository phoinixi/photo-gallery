import { LoaderFunction } from 'react-router-dom';
import { PhotoInfo } from '../models/PhotoInfo.Model';
import { pageAtom, photoEditAtom, photoFilterAtom, photoIdAtom, photoIntoAtom, photoListAtom, store } from '../store';

const getSearchParams = (url: string) => {
  const params = new URL(url).searchParams;
  const blur = params.get('blur');
  const grayscale = params.has('grayscale');
  const width = params.get('width');
  const height = params.get('height');
  return { blur, grayscale, width, height };
};

export const photosLoaderFunction: LoaderFunction<Promise<PhotoInfo[]>> = ({ params }) => {
  const currentPage = params.page ? parseInt(params.page, 10) : 1;
  store.set(pageAtom, currentPage);
  return store.get(photoListAtom);
};

export const photoInfoLoaderFunction: LoaderFunction<Promise<PhotoInfo>> = async ({ params, request }) => {
  if (!params.id) {
    throw new Error('Photo not found');
  }

  const { blur, grayscale, width, height } = getSearchParams(request.url);
  const id = parseInt(params.id, 10);

  store.set(photoIdAtom, id);

  const imageInfo = await store.get(photoIntoAtom);

  store.set(photoFilterAtom, {
    ...(blur && { blur }),
    grayscale,
    width: width ? width : `${imageInfo.width}`,
    height: height ? height : `${imageInfo.height}`
  });

  return {
    ...imageInfo,
    download_url: URL.createObjectURL(await store.get(photoEditAtom))
  };
};
