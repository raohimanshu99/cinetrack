import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    setImgError(false);
  }, [movie?.poster]);

  if (!movie) {
    return (
      <div className="detail-not-found">
        <p>Movie not found.</p>
        <button type="button" onClick={() => navigate('/')}>Go back</button>
      </div>
    );
  }

  const inList = isInWatchlist(movie.id);
  const currentStatus = getStatus(movie.id);
  const metadata = [
    movie.rating != null && { key: 'rating', label: `★ ${movie.rating}` },
    movie.year != null && { key: 'year', label: movie.year },
    movie.duration && { key: 'duration', label: movie.duration },
  ].filter(Boolean);
  const cast = Array.isArray(movie.cast) ? movie.cast.filter(Boolean) : [];
  const genres = Array.isArray(movie.genre) ? movie.genre.filter(Boolean) : [];

  const handleToggle = () => {
    if (inList) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  return (
    <div className="detail-page">
      <button type="button" className="detail-back" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="detail-layout">
        <aside className="detail-poster">
          {imgError || !movie.poster ? (
            <div className="detail-poster-fallback" role="img" aria-label={`Poster unavailable for ${movie.title}`}>
              <span>{movie.title}</span>
              <small>Poster unavailable</small>
            </div>
          ) : (
            <img
              src={movie.poster}
              alt={movie.title}
              onError={() => setImgError(true)}
            />
          )}
        </aside>

        <main className="detail-info">
          {(movie.type || genres.length > 0) && (
            <div className="detail-badges">
              {movie.type && <span className="badge badge-type">{movie.type}</span>}
              {genres.map((g) => (
                <span key={g} className="badge badge-genre">{g}</span>
              ))}
            </div>
          )}

          <h1 className="detail-title">{movie.title}</h1>

          {metadata.length > 0 && (
            <div className="detail-meta" role="group" aria-label="Movie information">
              {metadata.map((item) => (
                <span className={item.key === 'rating' ? 'detail-rating' : ''} key={item.key}>
                  {item.label}
                </span>
              ))}
            </div>
          )}

          {movie.description && <p className="detail-description">{movie.description}</p>}

          {(movie.director || cast.length > 0) && (
            <div className="detail-crew">
              {movie.director && (
                <div className="detail-crew-item">
                  <span className="detail-crew-label">Director</span>
                  <span className="detail-crew-value">{movie.director}</span>
                </div>
              )}
              {cast.length > 0 && (
                <div className="detail-crew-item">
                  <span className="detail-crew-label">Cast</span>
                  <span className="detail-crew-value">{cast.join(', ')}</span>
                </div>
              )}
            </div>
          )}

          <div className="detail-actions">
            <button
              type="button"
              className={`btn-primary ${inList ? 'in-list' : ''}`}
              onClick={handleToggle}
              aria-pressed={inList}
            >
              {inList ? '✓ In Watchlist' : '+ Add to Watchlist'}
            </button>
          </div>

          {inList && (
            <div className="detail-status-section">
              <h2 className="detail-status-label">Status</h2>
              <div className="detail-status-btns">
                {Object.values(STATUS).map((s) => (
                  <button
                    type="button"
                    key={s}
                    className={`status-btn ${currentStatus === s ? 'active' : ''}`}
                    onClick={() => updateStatus(movie.id, s)}
                    aria-pressed={currentStatus === s}
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
