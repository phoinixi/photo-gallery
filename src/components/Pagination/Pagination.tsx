import { Button, makeStyles, Text, tokens } from '@fluentui/react-components';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: tokens.spacingHorizontalM
  }
});

type PaginationProps = {
  page: string;
};

export function Pagination({ page }: PaginationProps) {
  const classes = useStyles();
  const currentPage = useMemo(() => parseInt(page, 10), [page]);

  return (
    <div className={classes.root}>
      <Link to={`/page/${currentPage - 1}/`}>
        <Button disabled={currentPage === 1}>Previous</Button>
      </Link>
      <Text>Page {currentPage}</Text>
      <Link to={`/page/${currentPage + 1}/`}>
        <Button>Next</Button>
      </Link>
    </div>
  );
}

export default Pagination;
