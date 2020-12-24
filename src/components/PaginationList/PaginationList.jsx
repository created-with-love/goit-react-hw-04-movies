import PropTypes from 'prop-types';
import './PaginationList.scss';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles(theme => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function PaginationList({
  movies,
  totalPages,
  page,
  handleChange,
}) {
  const classes = useStyles();

  return (
    <>
      {movies.length > 1 && (
        <div className={classes.root}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChange}
            color="secondary"
          />
        </div>
      )}
    </>
  );
}

PaginationList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string,
      name: PropTypes.string,
      poster_path: PropTypes.string,
    }),
  ),
  totalPages: PropTypes.number,
  page: PropTypes.number,
  handleChange: PropTypes.func.isRequired,
};
