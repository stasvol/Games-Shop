import {useEffect, useState} from "react";
import axios from "axios";
import {BASE_PATH, PARAM_DEALS, PARAM_GAMES, PARAM_STORE_ID, STORES_PARAM, TITLE_PARAM} from "../games-shop/const";

export const useShopGames = () => {

    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchGames, setSearchGames] = useState([]);
    const [dealsGames, setDeals] = useState([]);

    useEffect(() => {
        axios.get
        ( `${BASE_PATH}${STORES_PARAM}`)
            .then(res => res.data)
            .then(result => setAxiosResult(result))
            .catch(error => console.error('Error ' + error))
    }, [])

    const setAxiosResult = result => {
        const stories = result.map(store => ({...store, isChecked: false}));
        setSearchResults(stories)
    }

    const axiosData = (searchQuery) => {
        setSearchQuery(searchQuery)
        axios.get
        (`${BASE_PATH}${PARAM_GAMES}?${TITLE_PARAM}${searchQuery}`)
            .then(res => {
                const games = res.data
                setSearchGames(games)
            })
            .catch(error => console.error('Error ' + error))
    }

    useEffect(() => {
        const storiesIds = searchResults
            .filter(item => item.isChecked) // [{}, {}] isChecked=true
            .map(item => {
                return item.storeID;
            })  // [1, 3, 5]
            .join(','); // 1,2,3

        axios.get(
            `${BASE_PATH}${PARAM_DEALS}?${PARAM_STORE_ID}${storiesIds}&${TITLE_PARAM}${searchQuery}`)
            .then(res => res.data)
            .then(deals => setAxiosDeals(deals))
            .catch(error => console.error('Error ' + error))
    }, [searchQuery, searchResults])

    const setAxiosDeals = deals => {
        setDeals(deals)
        console.log(deals)
    }

    const getSearch = (e) => {
        if (e.key === 'Enter') {
            setSearchQuery(searchQuery)
            axiosData(searchQuery)
        }
    }

    const handleChange = (e) => {
        setSearchQuery(e.target.value)
    }

    const handleCheck = (id) => {
        const newStories = searchResults.map(item => {
            if (item.storeID === id) {
                return {...item, isChecked: !item.isChecked};
            } else {
                return item;
            }
        });
        setSearchResults(newStories);
    }

    return { searchResults, searchQuery, searchGames, dealsGames, getSearch, handleChange, handleCheck }
}