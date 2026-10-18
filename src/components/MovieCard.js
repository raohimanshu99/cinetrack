import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useWatchlist } from '../context/WatchlistContext';
import './MovieCard.css';

const STATUS_COLORS = {
  'Want to Watch': '#1a5fa8',
  'Watching': '#b85c00',
  'Watched': '#2e7d52',
};

function MovieCard({ movie, showStatus }) {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist, getStatus } = useWatchlist();
  const [posterFailed, setPosterFailed] = useState(false);

  const inList = isInWatchlist(movie.id);
  const status = getStatus(movie.id);

  const handleToggle = () => {
    if (inList) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  return (
    <article className="movie-card">
      <Link
        to={`/movie/${movie.id}`}
        className="movie-card-link"
        aria-label={`View details for ${movie.title}`}
      >
        <div className="movie-card-poster">
          {posterFailed || !movie.poster ? (
            <div className="movie-card-poster-fallback" aria-hidden="true">
              <span>{movie.title}</span>
            </div>
          ) : (
            <img
              src={movie.poster}
              alt=""
              loading="lazy"
              onError={() => setPosterFailed(true)}
            />
          )}
          <span className="movie-type-badge">{movie.type}</span>
          {inList && showStatus && status && (
            <span
              className="movie-status-badge"
              style={{ background: STATUS_COLORS[status] }}
            >
              {status}
            </span>
          )}
        </div>

        <div className="movie-card-body">
          <div className="movie-card-top">
            <h3 className="movie-title">{movie.title}</h3>
            <span className="movie-rating">★ {movie.rating}</span>
          </div>
          <p className="movie-meta">
            {movie.year} · {movie.genre[0]}
          </p>
        </div>
      </Link>

      <button
        type="button"
        className={`watchlist-btn ${inList ? 'in-list' : ''}`}
        onClick={handleToggle}
        aria-label={`Watchlist: ${movie.title}`}
        aria-pressed={inList}
      >
        {inList ? '✓ In Watchlist' : '+ Watchlist'}
      </button>
    </article>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    genre: PropTypes.arrayOf(PropTypes.string).isRequired,
    rating: PropTypes.number.isRequired,
    poster: PropTypes.string.isRequired,
  }).isRequired,
  showStatus: PropTypes.bool,
};

MovieCard.defaultProps = {
  showStatus: false,
};

export default MovieCard;
