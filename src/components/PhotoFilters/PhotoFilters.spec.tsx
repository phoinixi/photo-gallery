import { fireEvent, render, screen } from '@testing-library/react';

import PhotoFilters from './PhotoFilters';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react';

const Component = ({ initialValues }: { initialValues: string }) => (
  <MemoryRouter initialEntries={[initialValues]}>
    <PhotoFilters />
  </MemoryRouter>
);

describe('PhotoFilters', () => {
  it('should get both blur and grayscale from searchParams', async () => {
    render(<Component initialValues="?blur=3&grayscale" />);
    const blur = await screen.findByLabelText('Blur', { exact: false });
    const grayscale = await screen.findByLabelText('Grayscale');

    expect(blur.getAttribute('value')).toBe('3');
    expect((grayscale as HTMLInputElement).checked).toBe(true);
  });

  it('should get only blur from searchParams', async () => {
    render(<Component initialValues="?blur=6" />);
    const blur = await screen.findByLabelText('Blur', { exact: false });
    const grayscale = await screen.findByLabelText('Grayscale');

    expect(blur.getAttribute('value')).toBe('6');
    expect((grayscale as HTMLInputElement).checked).toBe(false);
  });

  it('should get only valid grayscale from searchParams', async () => {
    render(<Component initialValues="?grayscale=&blur" />);
    const blur = await screen.findByLabelText('Blur', { exact: false });
    const grayscale = await screen.findByLabelText('Grayscale');

    expect(blur.getAttribute('value')).toBe('0');
    expect((grayscale as HTMLInputElement).checked).toBe(true);
  });

  it('should not get values from searchParams', async () => {
    render(<Component initialValues="" />);
    const blur = await screen.findByLabelText('Blur', { exact: false });
    const grayscale = await screen.findByLabelText('Grayscale');

    expect(blur.getAttribute('value')).toBe('0');
    expect((grayscale as HTMLInputElement).checked).toBe(false);
  });

  it('should allow to change blur', async () => {
    render(<Component initialValues="" />);
    const blur = await screen.findByLabelText('Blur', { exact: false });

    expect(blur.getAttribute('value')).toBe('0');

    act(() => {
      fireEvent.change(blur, { target: { value: '5' } });
    });

    expect(blur.getAttribute('value')).toBe('5');
  });

  it('should allow to change grayscale from false to true', async () => {
    render(<Component initialValues="" />);
    const grayscale = await screen.findByLabelText('Grayscale');

    expect((grayscale as HTMLInputElement).checked).toBe(false);

    act(() => {
      fireEvent.click(grayscale);
    });

    expect((grayscale as HTMLInputElement).checked).toBe(true);
  });

  it('should allow to change grayscale from true to false', async () => {
    render(<Component initialValues="?grayscale" />);
    const grayscale = await screen.findByLabelText('Grayscale');

    expect((grayscale as HTMLInputElement).checked).toBe(true);

    act(() => {
      fireEvent.click(grayscale);
    });

    expect((grayscale as HTMLInputElement).checked).toBe(false);
  });

  it('should allow to change grayscale from false to true and back', async () => {
    render(<Component initialValues="" />);
    const grayscale = await screen.findByLabelText('Grayscale');

    expect((grayscale as HTMLInputElement).checked).toBe(false);

    act(() => {
      fireEvent.click(grayscale);
    });

    expect((grayscale as HTMLInputElement).checked).toBe(true);

    act(() => {
      fireEvent.click(grayscale);
    });

    expect((grayscale as HTMLInputElement).checked).toBe(false);
  });

  it('should allow to change blur and grayscale', async () => {
    render(<Component initialValues="" />);
    const blur = await screen.findByLabelText('Blur', { exact: false });
    const grayscale = await screen.findByLabelText('Grayscale');

    expect(blur.getAttribute('value')).toBe('0');
    expect((grayscale as HTMLInputElement).checked).toBe(false);

    act(() => {
      fireEvent.change(blur, { target: { value: '5' } });
    });

    expect(blur.getAttribute('value')).toBe('5');

    act(() => {
      fireEvent.click(grayscale);
    });

    expect((grayscale as HTMLInputElement).checked).toBe(true);
  });
});
