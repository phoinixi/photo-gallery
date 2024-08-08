import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PhotoResize from './PhotoResize';
import { act } from 'react';
import { PHOTO_MIN_SIZE } from '../../constants';

const Component = ({ initialValues }: { initialValues: string }) => (
  <MemoryRouter initialEntries={[initialValues]}>
    <PhotoResize originalHeight={768} originalWidth={1024} />
  </MemoryRouter>
);

describe('PhotoResize', () => {
  it('should get size from searchParams', async () => {
    render(<Component initialValues="?width=100&height=800" />);
    const widthInput = await screen.findByLabelText('Width', { exact: false });
    const heightInput = await screen.findByLabelText('Height', { exact: false });

    expect(widthInput.getAttribute('value')).toBe('100');
    expect(heightInput.getAttribute('value')).toBe('800');
  });

  it('should get original sizes', async () => {
    render(<Component initialValues="" />);
    const widthInput = await screen.findByLabelText('Width', { exact: false });
    const heightInput = await screen.findByLabelText('Height', { exact: false });

    expect(widthInput.getAttribute('value')).toBe('1024');
    expect(heightInput.getAttribute('value')).toBe('768');
  });

  it('should keep height aspect ratio when changing width', async () => {
    render(<Component initialValues="" />);
    const widthInput = await screen.findByLabelText('Width', { exact: false });
    const heightInput = await screen.findByLabelText('Height', { exact: false });

    act(() => {
      fireEvent.change(widthInput, { target: { value: '800' } });
    });

    expect(widthInput.getAttribute('value')).toBe('800');
    expect(heightInput.getAttribute('value')).toBe('600');
  });

  it('should keep width aspect ratio when changing height', async () => {
    render(<Component initialValues="" />);
    const widthInput = await screen.findByLabelText('Width', { exact: false });
    const heightInput = await screen.findByLabelText('Height', { exact: false });

    act(() => {
      fireEvent.change(heightInput, { target: { value: '600' } });
    });

    expect(widthInput.getAttribute('value')).toBe('800');
    expect(heightInput.getAttribute('value')).toBe('600');
  });

  it('should work also without keeping aspect ratio', async () => {
    render(<Component initialValues="" />);
    const widthInput = await screen.findByLabelText('Width', { exact: false });
    const heightInput = await screen.findByLabelText('Height', { exact: false });
    const keepAspectRatioCheckbox = await screen.findByLabelText('Keep aspect ratio');

    act(() => {
      fireEvent.click(keepAspectRatioCheckbox);
    });

    act(() => {
      fireEvent.change(heightInput, { target: { value: '600' } });
    });

    expect(widthInput.getAttribute('value')).toBe('1024');
    expect(heightInput.getAttribute('value')).toBe('600');
  });

  it('should reset to original values', async () => {
    render(<Component initialValues="" />);
    const widthInput = await screen.findByLabelText('Width', { exact: false });
    const heightInput = await screen.findByLabelText('Height', { exact: false });
    const resetButton = await screen.findByText('Reset');

    act(() => {
      fireEvent.change(heightInput, { target: { value: '600' } });
    });

    expect(widthInput.getAttribute('value')).toBe('800');
    expect(heightInput.getAttribute('value')).toBe('600');

    act(() => {
      fireEvent.click(resetButton);
    });

    expect(heightInput.getAttribute('value')).toBe('768');
    expect(widthInput.getAttribute('value')).toBe('1024');
  });

  it('should apply new sizes', async () => {
    render(<Component initialValues="" />);
    const widthInput = await screen.findByLabelText('Width', { exact: false });
    const heightInput = await screen.findByLabelText('Height', { exact: false });
    const applyButton = await screen.findByText('Apply');

    act(() => {
      fireEvent.change(widthInput, { target: { value: '800' } });
    });

    act(() => {
      fireEvent.change(heightInput, { target: { value: '600' } });
    });

    act(() => {
      fireEvent.click(applyButton);
    });

    expect(widthInput.getAttribute('value')).toBe('800');
    expect(heightInput.getAttribute('value')).toBe('600');
  });

  it('should show error when width is invalid', async () => {
    render(<Component initialValues="" />);
    const widthInput = await screen.findByLabelText('Width', { exact: false });

    act(() => {
      fireEvent.change(widthInput, { target: { value: `${PHOTO_MIN_SIZE - 1}` } });
    });

    const errorMessage = await screen.findByText(`Width must be between ${PHOTO_MIN_SIZE}px and 1024px`);
    expect(errorMessage).toBeInTheDocument();
  });

  it('should show error when height is invalid', async () => {
    render(<Component initialValues="" />);
    const heightInput = await screen.findByLabelText('Height', { exact: false });

    act(() => {
      fireEvent.change(heightInput, { target: { value: `${PHOTO_MIN_SIZE - 1}` } });
    });

    const errorMessage = await screen.findByText(`Height must be between ${PHOTO_MIN_SIZE}px and 768px`);
    expect(errorMessage).toBeInTheDocument();
  });

  it('should show error when width is invalid', async () => {
    render(<Component initialValues="" />);
    const widthInput = await screen.findByLabelText('Width', { exact: false });

    act(() => {
      fireEvent.change(widthInput, { target: { value: '2000' } });
    });

    const errorMessage = await screen.findByText(`Width must be between ${PHOTO_MIN_SIZE}px and 1024px`);
    expect(errorMessage).toBeInTheDocument();
  });

  it('should show error when height is invalid', async () => {
    render(<Component initialValues="" />);
    const heightInput = await screen.findByLabelText('Height', { exact: false });

    act(() => {
      fireEvent.change(heightInput, { target: { value: '2000' } });
    });

    const errorMessage = await screen.findByText(`Height must be between ${PHOTO_MIN_SIZE}px and 768px`);
    expect(errorMessage).toBeInTheDocument();
  });

  it('should not show error when width is valid', async () => {
    render(<Component initialValues="" />);
    const widthInput = await screen.findByLabelText('Width', { exact: false });

    act(() => {
      fireEvent.change(widthInput, { target: { value: '800' } });
    });

    expect(screen.queryByText(`Width must be between ${PHOTO_MIN_SIZE}px and 1024px`)).toBeNull();
  });

  it('should not show error when height is valid', async () => {
    render(<Component initialValues="" />);
    const heightInput = await screen.findByLabelText('Height', { exact: false });

    act(() => {
      fireEvent.change(heightInput, { target: { value: '600' } });
    });

    expect(screen.queryByText(`Height must be between ${PHOTO_MIN_SIZE}px and 768px`)).toBeNull();
  });
});
