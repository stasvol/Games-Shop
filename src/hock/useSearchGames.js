import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import {
  BASE_PATH,
  PARAM_GAMES,
  SEARCH_PATH,
  STORES_PARAM,
  TITLE_PARAM,
} from '../components/const';

export const useSearchGames = (setAxiosResult, setSearchQuery) => {
  const [searchGames, setSearchGames] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_PATH}${STORES_PARAM}`)
      .then(res => res.data)
      .then(result => setAxiosResult(result))
      .catch(error => console.error(`Error ${error}`));
  }, [setAxiosResult]);

  const axiosData = useCallback(
    searchQuery => {
      setSearchQuery(searchQuery);
      axios
        .get(`${BASE_PATH}${PARAM_GAMES}${SEARCH_PATH}${TITLE_PARAM}${searchQuery}`)
        .then(res => {
          const games = res.data;
          setSearchGames(games);
        })
        .catch(error => console.error(`Error ${error}`));
    },
    [setSearchQuery, setSearchGames],
  );

  return { searchGames, axiosData };
};
