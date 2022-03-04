import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_PATH, PARAM_DEALS, PARAM_STORE_ID, TITLE_PARAM } from '../components/const';

export const useSearchResults = (searchQuery, setDealsGames) => {
  const [searchResults, setSearchResults] = useState([]);

  const setAxiosResult = useCallback(
    result => {
      const stories = result.map(store => ({ ...store, isChecked: false }));
      setSearchResults(stories);
    },
    [setSearchResults],
  );

  const setAxiosDeals = useCallback(
    deals => {
      setDealsGames(deals);
      console.log(deals);
    },
    [setDealsGames],
  );

  useEffect(() => {
    const storiesIds = searchResults
      .filter(item => item.isChecked) // [{}, {}] isChecked=true
      .map(item => {
        return item.storeID;
      }) // [1, 3, 5]
      .join(','); // 1,2,3

    axios
      .get(
        `${BASE_PATH}${PARAM_DEALS}?${PARAM_STORE_ID}${storiesIds}
             &${TITLE_PARAM}${searchQuery}`,
      )
      .then(res => res.data)
      .then(deals => setAxiosDeals(deals))
      .catch(error => console.error(`Error ${error}`));
  }, [searchQuery, searchResults, setAxiosDeals]);

  const handleCheck = useCallback(
    id => {
      const newStories = searchResults.map(item => {
        if (item.storeID === id) {
          return { ...item, isChecked: !item.isChecked };
        }
        return item;
      });
      setSearchResults(newStories);
    },
    [searchResults],
  );

  return { setAxiosResult, searchResults, setSearchResults, handleCheck };
};
