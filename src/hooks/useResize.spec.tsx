import { Location, MemoryRouter, useLocation } from 'react-router-dom';
import { renderHook, act } from '@testing-library/react';
import { useResize } from './useResize';

let location: Location;

const originalSize = { originalHeight: 768, originalWidth: 1024 };

const LocationWrapper = ({ children }: { children?: React.ReactNode }) => {
  location = useLocation();
  return <>{children}</>;
};

const Wrapper =
  (initialSearchParams: string = '') =>
  ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter initialEntries={[initialSearchParams]}>
      <LocationWrapper />
      {children}
    </MemoryRouter>
  );

describe('useResize', () => {
  it('should return original dimensions', () => {
    const { result } = renderHook(() => useResize(originalSize), {
      wrapper: Wrapper('')
    });

    act(() => {
      expect(result.current.height).toBe('768');
      expect(result.current.width).toBe('1024');
    });
  });

  it('should return dimensions from searchParams', () => {
    const { result } = renderHook(() => useResize(originalSize), {
      wrapper: Wrapper('?width=100&height=800')
    });

    act(() => {
      expect(result.current.height).toBe('800');
      expect(result.current.width).toBe('100');
    });
  });

  it('should keep aspect ratio when changing width', () => {
    const { result } = renderHook(() => useResize(originalSize), {
      wrapper: Wrapper('')
    });

    act(() => {
      result.current.handleWidthChange('800', true);
    });

    expect(result.current.height).toBe('600');
  });

  it('should keep aspect ratio when changing height', () => {
    const { result } = renderHook(() => useResize(originalSize), {
      wrapper: Wrapper('')
    });

    act(() => {
      result.current.handleHeightChange('600', true);
    });

    expect(result.current.width).toBe('800');
  });

  it('should not keep aspect ratio when changing width', () => {
    const { result } = renderHook(() => useResize(originalSize), {
      wrapper: Wrapper('')
    });

    act(() => {
      result.current.handleWidthChange('800', false);
    });

    expect(result.current.height).toBe('768');
  });

  it('should not keep aspect ratio when changing height', () => {
    const { result } = renderHook(() => useResize(originalSize), {
      wrapper: Wrapper('')
    });

    act(() => {
      result.current.handleHeightChange('600', false);
    });

    expect(result.current.width).toBe('1024');
  });

  it('should reset dimensions', () => {
    const { result } = renderHook(() => useResize(originalSize), {
      wrapper: Wrapper('?width=100&height=800')
    });

    act(() => {
      result.current.handleReset();
    });

    expect(location.search).toBe('');
    expect(result.current.height).toBe('768');
    expect(result.current.width).toBe('1024');
  });

  it('should resize dimensions', () => {
    const { result } = renderHook(() => useResize(originalSize), {
      wrapper: Wrapper('')
    });

    act(() => {
      result.current.handleResize('800', '600');
    });

    expect(location.search).toBe('?width=800&height=600');
  });

  it('should resize dimensions to original', () => {
    const { result } = renderHook(() => useResize(originalSize), {
      wrapper: Wrapper('?width=800&height=600')
    });

    act(() => {
      result.current.handleResize('1024', '768');
    });

    expect(location.search).toBe('');
  });
});
