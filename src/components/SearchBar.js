import React from 'react';
import PropTypes from 'prop-types';
import './SearchBar.css';

function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="search-bar">
      <span className="search-icon">⌕</span>
      <input
        type="text"
        className="search-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {value && (
        <button className="search-clear" onClick={() => onChange('')} aria-label="Clear search">
          ×
        </button>
      )}
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
