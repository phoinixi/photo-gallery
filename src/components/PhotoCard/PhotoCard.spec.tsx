import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import PhotoCard from './PhotoCard';
import { PhotoInfo } from '../../models/PhotoInfo.Model';
import { act } from 'react';

const dummyPhoto: PhotoInfo = {
  id: '1',
  author: 'Test',
  download_url: 'https://test.com',
  height: 100,
  width: 100,
  url: 'https://test.com'
};

describe('PhotoCard', () => {
  it('should render successfully', async () => {
    render(<PhotoCard mode="gallery" photo={dummyPhoto} />);

    const author = await screen.findByText('Test');
    expect(author).toBeInTheDocument();
  });

  it('should render successfully', async () => {
    render(<PhotoCard mode="gallery" photo={dummyPhoto} />);

    const author = await screen.findByText('#1');
    expect(author).toBeInTheDocument();
  });

  it('should render photo in gallery mode', async () => {
    render(<PhotoCard mode="gallery" photo={dummyPhoto} />);

    const image = await screen.findByRole('img');
    expect(image).toHaveAttribute('src', 'https://via.placeholder.com/400');
  });

  it('should render photo in editor mode', async () => {
    render(<PhotoCard mode="gallery" photo={dummyPhoto} />);

    const image = await screen.findByRole('img');

    act(() => {
      fireEvent.load(image);
    });

    expect(image).toHaveAttribute('src', 'https://picsum.photos/id/1/400.webp');
  });

  it('should render photo in editor mode', async () => {
    render(<PhotoCard mode="editor" photo={dummyPhoto} />);

    const image = await screen.findByRole('img');
    expect(image).toHaveAttribute('src', 'https://test.com');
  });
});
