import { useEffect, useState, lazy, Suspense, useRef } from 'react';
import {
  Route,
  useParams,
  useRouteMatch,
  NavLink,
  useLocation,
  useHistory,
} from 'react-router-dom';

import * as MoviesAPI from '../services/movies-api';
import MovieItem from '../components/MovieItem';
import Spinner from '../components/Spinner/Spinner';
import Modal from '../components/Modal';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import './styles/MovieDetailsPage.scss';

const Trailer = lazy(() =>
  import('../components/Trailer' /* webpackChunkName: "trailer"*/),
);

const CastView = lazy(() =>
  import('./CastPage' /* webpackChunkName: "cast-subview"*/),
);
const Reviews = lazy(() =>
  import('./ReviewsPage' /* webpackChunkName: "reviews-subview"*/),
);

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();
  const { url, path } = useRouteMatch();
  const location = useLocation();
  const refLocation = useRef(location);
  const history = useHistory();
  const [modal, setModal] = useState(false);

  useEffect(() => {
    MoviesAPI.fetchMovieDetais(movieId).then(setMovie);

    return () => {
      setMovie(null);
    };
  }, [movieId]);

  // Запоминаю с useRef локейшн, который был до перехода на карточку фильма,
  // что бы с помощью кнопки назад сразу вернуться на страницу поиска \ главную
  function goBack() {
    // window.history.back();
    const { pathname, search } = refLocation.current.state.from;
    history.push(search ? pathname + search : pathname);
  }

  function toggleModal() {
    setModal(state => !state);
  }

  return (
    <>
      {movie && (
        <>
          <div className="button-box">
            <button type="button" onClick={goBack} className="back-btn">
              Go back
            </button>
            <button
              type="button"
              data-id={movieId}
              className="trailer-btn"
              onClick={toggleModal}
            >
              Trailer
            </button>
          </div>
          <MovieItem movie={movie} />
        </>
      )}

      {modal && (
        <Modal onClose={toggleModal}>
          <Suspense fallback={<Spinner />}>
            <Trailer id={movieId} />
          </Suspense>
        </Modal>
      )}

      <div className="details-box">
        <NavLink
          to={`${url}/cast`}
          className="movie-link"
          activeClassName="active-link"
        >
          Cast
        </NavLink>
        <NavLink
          to={`${url}/reviews`}
          className="movie-link"
          activeClassName="active-link"
        >
          Reviews
        </NavLink>
      </div>

      <Suspense fallback={<Spinner />}>
        <Route path={`${path}/cast`} exact>
          <CastView />
        </Route>

        <Route path={`${path}/reviews`} exact>
          <Reviews />
        </Route>
      </Suspense>
    </>
  );
}
