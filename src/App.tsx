import { FluentProvider, makeStyles, tokens, webLightTheme } from '@fluentui/react-components';
import { router } from './routes/AppRoutes';
import { RouterProvider } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    height: '100%',
    background: tokens.colorNeutralBackgroundInverted,
    color: tokens.colorNeutralForegroundInverted
  }
});

export function App() {
  const classes = useStyles();

  return (
    <FluentProvider theme={webLightTheme} className={classes.root}>
      <RouterProvider router={router} />
    </FluentProvider>
  );
}
