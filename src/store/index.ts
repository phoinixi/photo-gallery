import { atom, createStore } from 'jotai';
import { atomWithCache } from 'jotai-cache';
import { PhotoInfo } from '../models/PhotoInfo.Model';
import { PHOTO_BASE_URL, PHOTO_EDIT_HEIGHT, PHOTO_LIST_BASE_URL, PHOTOS_PER_PAGE } from '../constants';

const store = createStore();

type PhotoFilter = { blur?: string; grayscale?: boolean; width?: string; height?: string };

export { store };

export const pageAtom = atom<number>(1);
export const photoIdAtom = atom<number>();
export const photoFileName = atom<string>('');
export const photoFilterAtom = atom<PhotoFilter>({});

export const photoListAtom = atomWithCache<Promise<PhotoInfo[]>>(async (get) => {
  const id = get(pageAtom);
  return fetch(`${PHOTO_LIST_BASE_URL}/?limit=${PHOTOS_PER_PAGE}&page=${id}`).then((response) => response.json());
});

export const photoIntoAtom = atomWithCache<Promise<PhotoInfo>>(async (get) => {
  const id = get(photoIdAtom);
  return fetch(`${PHOTO_BASE_URL}/${id}/info`).then((response) => response.json());
});

export const photoEditAtom = atomWithCache<Promise<Blob>>(async (get) => {
  const id = get(photoIdAtom);
  const { blur, grayscale, height = PHOTO_EDIT_HEIGHT, width = PHOTO_EDIT_HEIGHT } = get(photoFilterAtom);

  const photoUrl = new URL(`${PHOTO_BASE_URL}/${id}/${width}/${height}.webp`);

  if (blur) {
    photoUrl.searchParams.set('blur', blur);
  }
  if (grayscale) {
    photoUrl.searchParams.set('grayscale', undefined as unknown as string);
  }

  return fetch(photoUrl.toString()).then((response) => response.blob());
});
