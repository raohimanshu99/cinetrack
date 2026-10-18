import React from 'react';
import PropTypes from 'prop-types';
import './SearchBar.css';

function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="search-control">
      <label className="search-label" htmlFor="movie-search">Search titles and genres</label>
      <div className="search-bar">
        <span className="search-icon" aria-hidden="true">⌕</span>
        <input
          id="movie-search"
          type="text"
          className="search-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
        {value && (
          <button type="button" className="search-clear" onClick={() => onChange('')} aria-label="Clear search">
            ×
          </button>
        )}
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

SearchBar.defaultProps = {
  placeholder: 'Search movies & shows...',
};

export default SearchBar;
