import React from 'react';
import PropTypes from 'prop-types';
import './FilterBar.css';

function FilterBar({ activeType, activeGenre, onTypeChange, onGenreChange, genres }) {
  const types = ['All', 'Movie', 'Series'];

  return (
    <div className="filter-bar">
      <div className="filter-group">
        {types.map((type) => (
          <button
            key={type}
            className={`filter-btn ${activeType === type ? 'active' : ''}`}
            onClick={() => onTypeChange(type)}
          >
            {type}
          </button>
        ))}
      </div>

      {genres.length > 0 && (
        <div className="filter-group genre-group">
          <button
            className={`filter-btn ${activeGenre === 'All' ? 'active' : ''}`}
            onClick={() => onGenreChange('All')}
          >
            All Genres
          </button>
          {genres.map((genre) => (
            <button
              key={genre}
              className={`filter-btn ${activeGenre === genre ? 'active' : ''}`}
              onClick={() => onGenreChange(genre)}
            >
              {genre}
            </button>
          ))}
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
