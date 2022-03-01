import React from 'react';
import PropTypes from 'prop-types';

const Stores = ({ searchResults, handleCheck }) => (
  <>
    <h3>Stores</h3>
    <ul className="items">
      {searchResults?.length &&
        searchResults.map(({ storeID, storeName, isChecked }) => {
          const handleChange = () => {
            handleCheck(storeID);
          };
          return (
            <li key={storeID}>
              {storeName}
              <input
                checked={isChecked}
                name="checkbox"
                onChange={handleChange}
                type="checkbox"
              />
            </li>
          );
        })}
    </ul>
  </>
);

Stores.propTypes = {
  searchResults: PropTypes.array,
  handleCheck: PropTypes.func,
};

Stores.defaultProps = {
  searchResults: [],
  handleCheck: () => {},
};

export default Stores;
