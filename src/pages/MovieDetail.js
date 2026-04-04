import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOVIES_DATA } from '../data/movies';
import { useWatchlist, STATUS } from '../context/WatchlistContext';
import './MovieDetail.css';

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = MOVIES_DATA.find((m) => m.id === parseInt(id));
  const { addToWatchlist, removeFromWatchlist, isInWatchlist, getStatus, updateStatus } = useWatchlist();
  const [imgError, setImgError] = useState(false);

  if (!movie) {
    return (
      <div className="detail-not-found">
        <p>Movie not found.</p>
        <button onClick={() => navigate('/')}>Go back</button>
      </div>
    );
  }

  const inList = isInWatchlist(movie.id);
  const currentStatus = getStatus(movie.id);

  const handleToggle = () => {
    if (inList) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  return (
    <div className="detail-page">
      <button className="detail-back" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="detail-layout">
        <aside className="detail-poster">
          <img
            src={imgError ? `https://via.placeholder.com/400x600/f4f4f2/9a9a96?text=${encodeURIComponent(movie.title)}` : movie.poster}
            alt={movie.title}
            onError={() => setImgError(true)}
          />
        </aside>

        <main className="detail-info">
          <div className="detail-badges">
            <span className="badge badge-type">{movie.type}</span>
            {movie.genre.map((g) => (
              <span key={g} className="badge badge-genre">{g}</span>
            ))}
          </div>

          <h1 className="detail-title">{movie.title}</h1>

          <div className="detail-meta">
            <span className="detail-rating">★ {movie.rating}</span>
            <span className="detail-dot">·</span>
            <span>{movie.year}</span>
            <span className="detail-dot">·</span>
            <span>{movie.duration}</span>
          </div>

          <p className="detail-description">{movie.description}</p>

          <div className="detail-crew">
            <div className="detail-crew-item">
              <span className="detail-crew-label">Director</span>
              <span className="detail-crew-value">{movie.director}</span>
            </div>
            <div className="detail-crew-item">
              <span className="detail-crew-label">Cast</span>
              <span className="detail-crew-value">{movie.cast.join(', ')}</span>
            </div>
          </div>

          <div className="detail-actions">
            <button
              className={`btn-primary ${inList ? 'in-list' : ''}`}
              onClick={handleToggle}
            >
              {inList ? '✓ In Watchlist' : '+ Add to Watchlist'}
            </button>
          </div>

          {inList && (
            <div className="detail-status-section">
              <p className="detail-status-label">Status</p>
              <div className="detail-status-btns">
                {Object.values(STATUS).map((s) => (
                  <button
                    key={s}
                    className={`status-btn ${currentStatus === s ? 'active' : ''}`}
                    onClick={() => updateStatus(movie.id, s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default MovieDetail;
