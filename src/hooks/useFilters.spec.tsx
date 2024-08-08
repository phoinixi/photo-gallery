import { Location, MemoryRouter, useLocation } from 'react-router-dom';
import { renderHook, act } from '@testing-library/react';
import { useFilters } from './useFilters';

let location: Location;

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

describe('useFilters', () => {
  it('should return filters from searchParams', () => {
    const { result } = renderHook(() => useFilters(), {
      wrapper: Wrapper('?blur=7&grayscale')
    });

    act(() => {
      expect(result.current.blur).toBe(7);
      expect(result.current.grayscale).toBe(true);
    });
  });

  it('should return blur from searchParams', () => {
    const { result } = renderHook(() => useFilters(), {
      wrapper: Wrapper('?blur=7')
    });

    act(() => {
      expect(result.current.blur).toBe(7);
      expect(result.current.grayscale).toBe(false);
    });
  });

  it('should return grayscale from searchParams', () => {
    const { result } = renderHook(() => useFilters(), {
      wrapper: Wrapper('?grayscale')
    });

    act(() => {
      expect(result.current.blur).toBe(0);
      expect(result.current.grayscale).toBe(true);
    });
  });

  it('should return default values', () => {
    const { result } = renderHook(() => useFilters(), {
      wrapper: Wrapper('')
    });

    act(() => {
      expect(result.current.blur).toBe(0);
      expect(result.current.grayscale).toBe(false);
    });
  });

  it('should allow to change blur', () => {
    const { result } = renderHook(() => useFilters(), {
      wrapper: Wrapper('')
    });

    act(() => {
      result.current.handleBlurChange(5);
    });

    expect(location.search).toBe('?blur=5');
  });

  it('should allow to change grayscale from false to true', () => {
    const { result } = renderHook(() => useFilters(), {
      wrapper: Wrapper('')
    });

    act(() => {
      result.current.handleGrayscaleChange(true);
    });

    expect(location.search).toBe('?grayscale=');
  });

  it('should allow to change grayscale from true to false', () => {
    const { result } = renderHook(() => useFilters(), {
      wrapper: Wrapper('?grayscale')
    });

    act(() => {
      result.current.handleGrayscaleChange(false);
    });

    expect(location.search).toBe('');
  });

  it('should reset filters', () => {
    const { result } = renderHook(() => useFilters(), {
      wrapper: Wrapper('?blur=5&grayscale')
    });

    act(() => {
      result.current.handleBlurChange(0);
      result.current.handleGrayscaleChange(false);
    });

    expect(location.search).toBe('');
  });

  it('should reset blur', () => {
    const { result } = renderHook(() => useFilters(), {
      wrapper: Wrapper('?blur=5')
    });

    act(() => {
      result.current.handleBlurChange(0);
    });

    expect(location.search).toBe('');
  });

  it('should reset grayscale', () => {
    const { result } = renderHook(() => useFilters(), {
      wrapper: Wrapper('?grayscale')
    });

    act(() => {
      result.current.handleGrayscaleChange(false);
    });

    expect(location.search).toBe('');
  });

  it('should reset nothing', () => {
    const { result } = renderHook(() => useFilters(), {
      wrapper: Wrapper('')
    });

    act(() => {
      result.current.handleBlurChange(0);
      result.current.handleGrayscaleChange(false);
    });

    expect(location.search).toBe('');
  });
});
