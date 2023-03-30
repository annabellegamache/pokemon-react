import React from 'react';
import filterStyle from './filter.module.css';

const Filter = ({ types, selectedTypes, onTypeChange }) => {
  return (
    <div className={filterStyle.section}>
      <h3>Filter Pokémon by type</h3>
      <div className={filterStyle.container}>
        {types.map((type) => (
          <div className={filterStyle.item} key={type}>
            <input
              type="checkbox"
              name={type}
              value={type}
              checked={selectedTypes.includes(type)}
              onChange={onTypeChange}
            />
            <label htmlFor={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;