import { Button, makeStyles } from '@fluentui/react-components';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

type ErrorProps = {
  title: string;
  message: string;
};

export function Error({ title, message }: ErrorProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1>{title}</h1>
      <p>{message}</p>
      <Link to="/">
        <Button>GO TO HOMEPAGE</Button>
      </Link>
    </div>
  );
}
