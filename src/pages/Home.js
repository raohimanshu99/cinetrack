import React, { useState, useMemo } from 'react';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import { MOVIES_DATA } from '../data/movies';
import './Home.css';

function Home() {
  const [search, setSearch] = useState('');
  const [activeType, setActiveType] = useState('All');
  const [activeGenre, setActiveGenre] = useState('All');

  const allGenres = useMemo(() => {
    const set = new Set();
    MOVIES_DATA.forEach((m) => m.genre.forEach((g) => set.add(g)));
    return Array.from(set).sort();
  }, []);

  const filtered = useMemo(() => {
    return MOVIES_DATA.filter((movie) => {
      const matchSearch =
        movie.title.toLowerCase().includes(search.toLowerCase()) ||
        movie.genre.some((g) => g.toLowerCase().includes(search.toLowerCase()));
      const matchType = activeType === 'All' || movie.type === activeType;
      const matchGenre = activeGenre === 'All' || movie.genre.includes(activeGenre);
      return matchSearch && matchType && matchGenre;
    });
  }, [search, activeType, activeGenre]);

  return (
    <div className="home-page">
      <div className="home-hero">
        <h1 className="home-headline">
          Your personal<br />
          <span className="home-headline-serif">movie tracker.</span>
        </h1>
        <p className="home-sub">
          Browse {MOVIES_DATA.length} titles. Save what you want to watch.
        </p>
      </div>

      <div className="home-controls">
        <SearchBar value={search} onChange={setSearch} placeholder="e.g. Dune or Sci-Fi" />
        <FilterBar
          activeType={activeType}
          activeGenre={activeGenre}
          onTypeChange={setActiveType}
          onGenreChange={setActiveGenre}
          genres={allGenres}
        />
      </div>

      <p className="results-count" aria-live="polite" aria-atomic="true">
        {filtered.length} matching {filtered.length === 1 ? 'title' : 'titles'}
      </p>

      {filtered.length === 0 ? (
        <section className="empty-state" aria-labelledby="empty-results-title">
          <p className="empty-icon" aria-hidden="true">◎</p>
          <h2 id="empty-results-title" className="empty-text">
            {search
              ? `No titles match “${search}” with the selected filters.`
              : 'No titles match these filters.'}
          </h2>
          <p className="empty-sub">Try a different search or adjust the selected filters.</p>
          <button
            type="button"
            className="empty-reset"
            onClick={() => { setSearch(''); setActiveType('All'); setActiveGenre('All'); }}
          >
            Reset search and filters
          </button>
        </section>
      ) : (
        <div className="movies-grid">
          {filtered.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
