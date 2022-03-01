import React from 'react';
import PropTypes from 'prop-types';

const Games = ({ searchGames }) => (
  <div>
    <h3>Games</h3>
    {searchGames && searchGames.length ? (
      searchGames.map(({ gameID, internalName }) => (
        <div key={gameID}>{internalName} </div>
      ))
    ) : (
      <p>Empty game list</p>
    )}
  </div>
);
Games.propTypes = {
  searchGames: PropTypes.array.isRequired,
};

export default Games;
