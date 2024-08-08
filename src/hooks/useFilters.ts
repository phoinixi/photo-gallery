import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

export type useResizeReturnValue = {
  blur: number;
  grayscale: boolean;
  handleBlurChange: (blur: number) => void;
  handleGrayscaleChange: (isGrayscale: boolean) => void;
};

export function useFilters(): useResizeReturnValue {
  const [searchParams, setSearchParams] = useSearchParams();

  const blur = parseInt(searchParams.get('blur') ?? '0', 10);
  const grayscale = searchParams.has('grayscale');

  const handleBlurChange = useCallback(
    (blur: number) => {
      if (blur === 0) {
        searchParams.delete('blur');
      } else {
        searchParams.set('blur', blur.toString());
      }
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams]
  );

  const handleGrayscaleChange = useCallback(
    (isGrayscale: boolean) => {
      if (isGrayscale) {
        searchParams.set('grayscale', '');
      } else {
        searchParams.delete('grayscale');
      }
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams]
  );
  return { blur, grayscale, handleBlurChange, handleGrayscaleChange };
}

export default useFilters;
