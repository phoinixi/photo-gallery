import { createBrowserRouter } from 'react-router-dom';
import { Router } from '@remix-run/router';
import Home from '../pages/Home/Home';
import { PhotoGallery } from '../pages/PhotoGallery/PhotoGallery';
import PhotoEditor from '../pages/PhotoEditor/PhotoEditor';
import { photoInfoLoaderFunction, photosLoaderFunction } from './loaders';
import { GenericError } from '../pages/Error/GenericError';
import { NotFound } from '../pages/Error/NotFound';

export const router: Router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <GenericError />,
    children: [
      {
        path: 'page/:page',
        element: <PhotoGallery />,
        loader: photosLoaderFunction,
        children: [
          {
            path: 'edit/:id',
            element: <PhotoEditor />,
            loader: photoInfoLoaderFunction
          }
        ]
      },
      {
        index: true,
        element: <PhotoGallery />,
        loader: photosLoaderFunction
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
]);
