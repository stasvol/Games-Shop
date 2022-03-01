import React from 'react';
import PropTypes from 'prop-types';

const Deals = ({ searchGames, dealsGames }) => (
  <>
    <h3>Deals</h3>
    {searchGames && searchGames.length && dealsGames.length ? (
      dealsGames.map(
        ({
          dealID,
          metacriticLink,
          title,
          metacriticScore,
          dealRating,
          releaseDate,
          thumb,
        }) => (
          <div key={dealID}>
            <a
              href={`https://www.metacritic.com${metacriticLink}`}
              rel="noreferrer"
              target="_blank"
            >
              Title:{title}
              {metacriticScore}
              Rating:{dealRating}
              Date: {new Date(releaseDate).toLocaleDateString()}
              <img alt={title} className="images" src={thumb} />
            </a>
          </div>
        ),
      )
    ) : (
      <p>Empty game list</p>
    )}
  </>
);
Deals.propTypes = {
  searchGames: PropTypes.array.isRequired,
  dealsGames: PropTypes.array.isRequired,
};

export default Deals;
