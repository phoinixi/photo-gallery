import { useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export type useResizeReturnValue = {
  width: string;
  height: string;
  handleReset: () => void;
  handleResize: (width: string, height: string) => void;
  handleWidthChange: (width: string, keepAspectRatio: boolean) => void;
  handleHeightChange: (height: string, keepAspectRatio: boolean) => void;
};

type ResizeHookProps = {
  originalHeight: number;
  originalWidth: number;
};

export function useResize({ originalHeight, originalWidth }: ResizeHookProps): useResizeReturnValue {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentWidth, setCurrentWidth] = useState<string>(searchParams.get('width') ?? originalWidth.toString());
  const [currentHeight, setCurrentHeight] = useState<string>(searchParams.get('height') ?? originalHeight.toString());

  const handleResize = useCallback(
    (width: string, height: string) => {
      if (width === originalWidth.toString() && height === originalHeight.toString()) {
        searchParams.delete('width');
        searchParams.delete('height');
      } else {
        searchParams.set('width', width);
        searchParams.set('height', height);
      }
      setSearchParams(searchParams);
    },
    [originalHeight, originalWidth, searchParams, setSearchParams]
  );

  const handleReset = useCallback(() => {
    setCurrentWidth(`${originalWidth}`);
    setCurrentHeight(`${originalHeight}`);
    handleResize(`${originalWidth}`, `${originalHeight}`);
  }, [handleResize, originalHeight, originalWidth]);

  const handleWidthChange = useCallback(
    (width: string, keepAspectRatio: boolean) => {
      if (keepAspectRatio) {
        setCurrentHeight(`${Math.round((parseInt(width, 10) / originalWidth) * originalHeight)}`);
      }
      setCurrentWidth(width);
    },
    [originalHeight, originalWidth]
  );

  const handleHeightChange = useCallback(
    (height: string, keepAspectRatio: boolean) => {
      if (keepAspectRatio) {
        setCurrentWidth(`${Math.round((parseInt(height, 10) / originalHeight) * originalWidth)}`);
      }
      setCurrentHeight(height);
    },
    [originalHeight, originalWidth]
  );

  return {
    height: currentHeight,
    width: currentWidth,
    handleHeightChange,
    handleWidthChange,
    handleReset,
    handleResize
  };
}

export default useResize;
