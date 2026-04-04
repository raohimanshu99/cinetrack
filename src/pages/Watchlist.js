import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWatchlist, STATUS } from '../context/WatchlistContext';
import MovieCard from '../components/MovieCard';
import './Watchlist.css';

function Watchlist() {
  const { watchlist } = useWatchlist();
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', ...Object.values(STATUS)];

  const filtered =
    activeFilter === 'All'
      ? watchlist
      : watchlist.filter((m) => m.status === activeFilter);

  const counts = {};
  Object.values(STATUS).forEach((s) => {
    counts[s] = watchlist.filter((m) => m.status === s).length;
  });

  if (watchlist.length === 0) {
    return (
      <div className="watchlist-page">
        <div className="watchlist-header">
          <h1 className="watchlist-title">My Watchlist</h1>
        </div>
        <div className="watchlist-empty">
          <p className="empty-icon">◎</p>
          <p className="empty-text">Your watchlist is empty.</p>
          <p className="empty-sub">Browse titles and hit <strong>+ Watchlist</strong> to save them here.</p>
          <Link to="/" className="btn-browse">Browse Titles</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="watchlist-page">
      <div className="watchlist-header">
        <div>
          <h1 className="watchlist-title">My Watchlist</h1>
          <p className="watchlist-count">{watchlist.length} saved titles</p>
        </div>
      </div>

      
      <div className="watchlist-stats">
        {Object.values(STATUS).map((s) => (
          <div key={s} className="stat-card">
            <span className="stat-num">{counts[s]}</span>
            <span className="stat-label">{s}</span>
          </div>
        ))}
      </div>

      
      <div className="watchlist-filters">
        {filters.map((f) => (
          <button
            key={f}
            className={`wl-filter-btn ${activeFilter === f ? 'active' : ''}`}
            onClick={() => setActiveFilter(f)}
          >
            {f}
            {f !== 'All' && counts[f] > 0 && (
              <span className="wl-count">{counts[f]}</span>
            )}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="watchlist-empty-filter">No titles with "{activeFilter}" status yet.</p>
      ) : (
        <div className="movies-grid">
          {filtered.map((movie) => (
            <MovieCard key={movie.id} movie={movie} showStatus />
          ))}
        </div>
      )}
    </div>
  );
}

export default Watchlist;
