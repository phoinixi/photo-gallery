import {
  Button,
  Checkbox,
  CheckboxOnChangeData,
  CheckboxProps,
  Field,
  Input,
  InputOnChangeData,
  makeStyles,
  Text,
  tokens
} from '@fluentui/react-components';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import useResize from '../../hooks/useResize';
import { PHOTO_MIN_SIZE } from '../../constants';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gap: tokens.spacingHorizontalM,
    border: `1px dashed ${tokens.colorNeutralStroke1}`,
    padding: tokens.spacingHorizontalM
  },

  inputs: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: tokens.spacingHorizontalS
  },

  buttons: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: tokens.spacingHorizontalS
  }
});

type PhotoResizeProps = {
  originalWidth: number;
  originalHeight: number;
};

export function PhotoResize({ originalWidth, originalHeight }: PhotoResizeProps) {
  const classes = useStyles();

  const { handleResize, handleReset, handleHeightChange, handleWidthChange, height, width } = useResize({
    originalHeight,
    originalWidth
  });

  const [keepAspectRatio, setKeepAspectRatio] = useState<CheckboxProps['checked']>(true);
  const [widthInputErrorMessage, setWidthInputErrorMessage] = useState<string>();
  const [heightInputErrorMessage, setHeightInputErrorMessage] = useState<string>();

  const handleKeepAspectRatioChange = useCallback((_: ChangeEvent<HTMLInputElement>, data: CheckboxOnChangeData) => {
    setKeepAspectRatio(data.checked);
  }, []);

  const onWidthChange = useCallback(
    (_: ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
      handleWidthChange(data.value, Boolean(keepAspectRatio));
    },
    [handleWidthChange, keepAspectRatio]
  );

  const onHeightChange = useCallback(
    (_: ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
      handleHeightChange(data.value, Boolean(keepAspectRatio));
    },
    [handleHeightChange, keepAspectRatio]
  );

  const onResize = useCallback(() => {
    handleResize(width, height);
  }, [handleResize, height, width]);

  useEffect(() => {
    const heightValue = parseInt(height, 10);
    if (!heightValue || heightValue > originalHeight || heightValue < PHOTO_MIN_SIZE) {
      setHeightInputErrorMessage(`Height must be between ${PHOTO_MIN_SIZE}px and ${originalHeight}px`);
    } else {
      setHeightInputErrorMessage(undefined);
    }
  }, [height, originalHeight, originalWidth]);

  useEffect(() => {
    const widthValue = parseInt(width, 10);
    if (!widthValue || widthValue > originalWidth || widthValue < PHOTO_MIN_SIZE) {
      setWidthInputErrorMessage(`Width must be between ${PHOTO_MIN_SIZE}px and ${originalWidth}px`);
    } else {
      setWidthInputErrorMessage(undefined);
    }
  }, [originalHeight, originalWidth, width]);

  return (
    <div className={classes.root}>
      <Text size={500}>Resize photo</Text>
      <div className={classes.inputs}>
        <Field
          label={`Width (max: ${originalWidth}px)`}
          validationState={widthInputErrorMessage ? 'error' : 'none'}
          validationMessage={widthInputErrorMessage}
        >
          <Input
            type="number"
            name="width"
            value={width}
            step={10}
            min={PHOTO_MIN_SIZE}
            max={originalWidth}
            onChange={onWidthChange}
          />
        </Field>
        <Field
          label={`Height (max: ${originalHeight}px)`}
          validationState={heightInputErrorMessage ? 'error' : 'none'}
          validationMessage={heightInputErrorMessage}
        >
          <Input
            type="number"
            name="height"
            value={height}
            step={10}
            min={PHOTO_MIN_SIZE}
            max={originalHeight}
            onChange={onHeightChange}
          />
        </Field>
        <Checkbox label="Keep aspect ratio" onChange={handleKeepAspectRatioChange} checked={keepAspectRatio} />
      </div>
      <div className={classes.buttons}>
        <Button onClick={handleReset}>Reset</Button>
        <Button
          appearance="primary"
          disabled={Boolean(widthInputErrorMessage) || Boolean(heightInputErrorMessage)}
          onClick={onResize}
        >
          Apply
        </Button>
      </div>
    </div>
  );
}

export default PhotoResize;
