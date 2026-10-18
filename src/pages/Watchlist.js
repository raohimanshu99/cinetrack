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
          <div>
            <h1 className="watchlist-title">My Watchlist</h1>
            <p className="watchlist-count" aria-live="polite">0 saved titles</p>
          </div>
        </div>
        <section className="watchlist-empty" aria-labelledby="watchlist-empty-title">
          <p className="watchlist-empty-icon" aria-hidden="true">◎</p>
          <h2 className="watchlist-empty-title" id="watchlist-empty-title">Your watchlist is empty</h2>
          <p className="watchlist-empty-copy">Browse titles and use <strong>+ Watchlist</strong> to save them here.</p>
          <Link to="/" className="btn-browse">Browse Titles</Link>
        </section>
      </div>
    );
  }

  return (
    <div className="watchlist-page">
      <div className="watchlist-header">
        <div>
          <h1 className="watchlist-title">My Watchlist</h1>
          <p className="watchlist-count" aria-live="polite">
            {watchlist.length} saved {watchlist.length === 1 ? 'title' : 'titles'}
          </p>
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

      
      <div className="watchlist-filters" role="group" aria-label="Filter watchlist by status">
        {filters.map((f) => (
          <button
            type="button"
            key={f}
            className={`wl-filter-btn ${activeFilter === f ? 'active' : ''}`}
            onClick={() => setActiveFilter(f)}
            aria-pressed={activeFilter === f}
          >
            {f}
            {f !== 'All' && counts[f] > 0 && (
              <span className="wl-count">{counts[f]}</span>
            )}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <section className="watchlist-empty watchlist-empty-filter" aria-labelledby="watchlist-filter-empty-title">
          <p className="watchlist-empty-icon" aria-hidden="true">◎</p>
          <h2 className="watchlist-empty-title" id="watchlist-filter-empty-title">
            No titles marked “{activeFilter}” yet
          </h2>
          <p className="watchlist-empty-copy">
            Choose All to see every saved title, or browse to add more.
          </p>
          <Link to="/" className="btn-browse">Browse Titles</Link>
        </section>
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
