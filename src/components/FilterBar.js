import React from 'react';
import PropTypes from 'prop-types';
import './FilterBar.css';

function FilterBar({ activeType, activeGenre, onTypeChange, onGenreChange, genres }) {
  const types = ['All', 'Movie', 'Series'];

  return (
    <div className="filter-bar">
      <div className="filter-row">
        <span className="filter-label">Type</span>
        <div className="filter-group" role="group" aria-label="Filter by type">
          {types.map((type) => (
            <button
              type="button"
              key={type}
              className={`filter-btn ${activeType === type ? 'active' : ''}`}
              onClick={() => onTypeChange(type)}
              aria-pressed={activeType === type}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {genres.length > 0 && (
        <div className="filter-row">
          <span className="filter-label">Genre</span>
          <div className="filter-group genre-group" role="group" aria-label="Filter by genre">
            <button
              type="button"
              className={`filter-btn ${activeGenre === 'All' ? 'active' : ''}`}
              onClick={() => onGenreChange('All')}
              aria-pressed={activeGenre === 'All'}
            >
              All Genres
            </button>
            {genres.map((genre) => (
              <button
                type="button"
                key={genre}
                className={`filter-btn ${activeGenre === genre ? 'active' : ''}`}
                onClick={() => onGenreChange(activeGenre === genre ? 'All' : genre)}
                aria-pressed={activeGenre === genre}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

FilterBar.propTypes = {
  activeType: PropTypes.string.isRequired,
  activeGenre: PropTypes.string.isRequired,
  onTypeChange: PropTypes.func.isRequired,
  onGenreChange: PropTypes.func.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default FilterBar;
