import React from 'react';

import { useShopGames } from '../hock/useShopGames';
import Games from './games';
import Stores from './stores';
import Deals from './deals';

const ShopGames = () => {
  const {
    searchResults,
    searchQuery,
    searchGames,
    dealsGames,
    getSearch,
    handleChange,
    handleCheck,
  } = useShopGames();

  return (
    <>
      <input
        onChange={handleChange}
        onKeyPress={getSearch}
        placeholder="Search"
        type="search"
        value={searchQuery}
      />
      <Games handleCheck={handleCheck} searchGames={searchGames} />
      <Stores handleCheck={handleCheck} searchResults={searchResults} />
      <Deals dealsGames={dealsGames} searchGames={searchGames} />
    </>
  );
};

export default ShopGames;
