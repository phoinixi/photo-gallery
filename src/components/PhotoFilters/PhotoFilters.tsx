import {
  Field,
  makeStyles,
  Slider,
  SliderOnChangeData,
  Switch,
  SwitchOnChangeData,
  Text,
  tokens
} from '@fluentui/react-components';
import useFilters from '../../hooks/useFilters';
import { ChangeEvent, useCallback } from 'react';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gap: tokens.spacingHorizontalM,
    border: `1px dashed ${tokens.colorNeutralStroke1}`,
    padding: tokens.spacingHorizontalM
  }
});

export function PhotoFilters() {
  const classes = useStyles();

  const { blur, grayscale, handleBlurChange, handleGrayscaleChange } = useFilters();

  const onGrayscaleChange = useCallback(
    (_: ChangeEvent<HTMLInputElement>, data: SwitchOnChangeData) => {
      handleGrayscaleChange(data.checked);
    },
    [handleGrayscaleChange]
  );

  const onBlurChange = useCallback(
    (_: ChangeEvent<HTMLInputElement>, data: SliderOnChangeData) => {
      handleBlurChange(data.value);
    },
    [handleBlurChange]
  );

  return (
    <div className={classes.root}>
      <Text size={500}>Filters</Text>
      <Field label={`Blur (current value: ${blur})`}>
        <Slider min={0} max={10} step={1} value={blur} onChange={onBlurChange} />
      </Field>
      <Field label="Grayscale">
        <Switch labelPosition="above" onChange={onGrayscaleChange} checked={grayscale} />
      </Field>
    </div>
  );
}

export default PhotoFilters;
