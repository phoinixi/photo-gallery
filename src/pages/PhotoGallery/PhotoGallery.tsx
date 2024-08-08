import { useLoaderData, useNavigation, useOutlet, useParams } from 'react-router-dom';
import { PhotoInfo } from '../../models/PhotoInfo.Model';
import { makeStyles, mergeClasses, tokens } from '@fluentui/react-components';
import { Pagination } from '../../components/Pagination/Pagination';
import { useMemo } from 'react';
import { DEFAULT_PAGE } from '../../constants';
import { SpinnerOverlay } from '../../components/SpinnerOverlay/SpinnerOverlay';
import PhotoCard from '../../components/PhotoCard/PhotoCard';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    padding: tokens.spacingVerticalXXXL
  },
  photoGallery: {
    maxWidth: '1680px',
    margin: '0 auto',
    display: 'flex',
    flexWrap: 'wrap',
    placeContent: 'center',
    gap: tokens.spacingHorizontalXXXL,
    marginBottom: tokens.spacingVerticalXXXL
  }
});

export const PhotoGallery = () => {
  const classes = useStyles();

  const { page = DEFAULT_PAGE } = useParams(); // no page means page 1
  const { state } = useNavigation();
  const result = useLoaderData() as PhotoInfo[];

  const Outlet = useOutlet();

  const isLoading = useMemo(() => state === 'loading', [state]);

  if (Outlet) {
    return Outlet;
  }

  return (
    <div className={classes.root}>
      {isLoading && <SpinnerOverlay />}
      <section className={mergeClasses(classes.photoGallery)}>
        {result.map((photo: PhotoInfo) => (
          <Link key={photo.id} to={`/page/${page}/edit/${photo.id}`}>
            <PhotoCard mode="gallery" photo={photo} />
          </Link>
        ))}
      </section>
      <Pagination page={page} />
    </div>
  );
};
