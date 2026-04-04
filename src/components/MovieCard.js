import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useWatchlist } from '../context/WatchlistContext';
import './MovieCard.css';

const STATUS_COLORS = {
  'Want to Watch': '#1a5fa8',
  'Watching': '#b85c00',
  'Watched': '#2e7d52',
};

function MovieCard({ movie, showStatus }) {
  const navigate = useNavigate();
  const { addToWatchlist, removeFromWatchlist, isInWatchlist, getStatus } = useWatchlist();

  const inList = isInWatchlist(movie.id);
  const status = getStatus(movie.id);

  const handleToggle = (e) => {
    e.stopPropagation();
    if (inList) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  return (
    <article className="movie-card" onClick={() => navigate(`/movie/${movie.id}`)}>
      <div className="movie-card-poster">
        <img
          src={movie.poster}
          alt={movie.title}
          loading="lazy"
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/300x450/f4f4f2/9a9a96?text=${encodeURIComponent(movie.title)}`;
          }}
        />
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

        <button
          className={`watchlist-btn ${inList ? 'in-list' : ''}`}
          onClick={handleToggle}
          aria-label={inList ? 'Remove from watchlist' : 'Add to watchlist'}
        >
          {inList ? '✓ In Watchlist' : '+ Watchlist'}
        </button>
      </div>
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
