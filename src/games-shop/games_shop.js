import React, {useEffect, useState} from "react";
import axios from "axios";


const ShopGames = () => {

    const [searchResults, setSearchResults] = useState([]);

    const [searchQuery, setSearchQuery] = useState("");
    const [searchGames, setSearchGames] = useState([]);

    const [dealsGames, setDeals] = useState([]);

    // const games = ["Sir", "Alexa", "Betmen", "Fasad", "Twit", "Lin", "Sink"]
    // useEffect(() => {
    //     const results:any = people.filter(person =>
    //         person.toLowerCase().includes(searchTerm)
    //     );
    //     setSearchResults(results);
    // }, [searchTerm]);

    const BASE_PATH = 'https://www.cheapshark.com/api/1.0/'
    const SEARCH_PATH = 'search'
    const SEARCH_PARAM = 'query= '
    const STORES_PARAM = 'stores'
    const PARAM_DEALS = 'deals'
    const PARAM_GAMES = 'games'
    const PARAM_STORE_ID = 'storeID='
    const TITLE_PARAM = 'title='

    useEffect(() => {
        axios.get
            // ( `${BASE_PATH}${STORES_PARAM}`)
            ('https://www.cheapshark.com/api/1.0/stores')

            // .then(res=> {
            //     const result  = res.data
            //     setSearchResults(result)
            //     console.log(result)
            // })

            .then(res => res.data)
            .then(result => setAxiosResult(result))
            .catch(error => console.error('Error ' + error))

        // https://www.cheapshark.com/api/1.0/deals?storeID=1,2,3&title=batman
        // https://www.cheapshark.com/api/1.0/stores

    }, [])

    const setAxiosResult = result => {
        const stories = result.map(store => ({...store, isChecked: false}));
        setSearchResults(stories)
    }


    const axiosData = (searchQuery) => {
        setSearchQuery(searchQuery)
        axios.get
        (`https://www.cheapshark.com/api/1.0/games?title=${searchQuery}`)
            //     (`${BASE_PATH}${PARAM_GAMES}?${TITLE_PARAM}${searchQuery}`)
            .then(res => {
                const games = res.data
                setSearchGames(games)
                console.log(games)
            })
            .catch(error => console.error('Error ' + error))

    }

    useEffect(() => {
        // const storiesIds = searchResults
        //     .filter(item => item.isChecked)
        //     .map(item => item.storeID)
        //     .join(',');

        // const storiesIds = searchResults.filter(item => item.isChecked);
        // const ids = [];
        // storiesIds.forEach(item => {
        //     ids.push(item.storeID);
        // })

        const storiesIds = searchResults
            .filter(item => item.isChecked) // [{}, {}]
            .map(item => {
                return item.storeID;
            })  // [1, 3, 5]
            .join(','); // 1,2,3

        axios.get(` https://www.cheapshark.com/api/1.0/deals?storeID=${storiesIds}&title=${searchQuery}`)

            // .then(res => {
            //     const deals = res.data
            //     setDeals(deals)
            //     console.log( deals )
            // })
            .then(res => res.data)
            .then(deals => setAxiosDeals(deals))
            .catch(error => console.error('Error ' + error))

    }, [searchQuery, searchResults])

    const setAxiosDeals = deals => {
        setDeals(deals)
        // console.log( "DEALS " + deals)

    }


    const getSearch = (e) => {
        if (e.key === 'Enter') {
            setSearchQuery(searchQuery)
            // setSearchGames(searchGames )
            axiosData(searchQuery)

        }
        // axiosData(searchQuery)
    }

    const handleChange = (e) => {

        setSearchQuery(e.target.value)

    }
    // const results = !searchTerm
    //     ? games
    //     : games.filter(games => games.includes(searchTerm)
    //     );
    const handleCheck = (id) => {
        // setSearchResults(prevSearchResults => prevSearchResults.map(item => item.storeID === id
        //     ? ({ ...item, isChecked: !item.isChecked })
        //     : item
        // ));

        const newStories = searchResults.map(item => {
            if (item.storeID === id) {
                return {...item, isChecked: !item.isChecked};
            } else {
                return item;
            }
        });

        setSearchResults(newStories);
    }
    // const handlerCheck = (e) => {
    // // let newArray=[...checkValue.e.target.id]
    // // if (checkValue.includes(e.target.id))  {
    // //     newArray= newArray.filter(el=>el !== e.target.id)
    // // }
    // //     setCheckValue({checkValue:newArray})
    //     // if (e.target.checked) {
    //     //
    //     //  if (!checkValue.includes(e.target.value) ) {
    //     //
    //     //      setCheckValue(prevState => ({checkValue:[...prevState.checkValue,e.target.value]}))
    //     //
    //     //  }
    //     // }else{
    //     //     setCheckValue(prevState => ({checkValue:[...prevState.checkValue.filter(checked=>checked!==e.target.value )]}))
    //     // }
    //     // setCheckValue(checked)
    //     // const {target} = e
    //     // const value = target.type === 'checkbox' ? target.checked : target.value
    //     // const {name} = target
    //     // setCheckValue(prevCheck=> ({...prevCheck,[name]:value})) ;
    // }


    return <div>

        <input onKeyPress={getSearch} onChange={handleChange} type="search" placeholder="Search" value={searchQuery}/>


        <h3>Games</h3>
        {searchGames && searchGames.length

            ? searchGames.map((item, i) => (
                <div key={i}>{item.internalName} </div>))


            : <p>Empty game list</p>


        }


        <h3>Stores</h3>

        <ul>
            {searchResults.map((item, i) => (
                <li key={item.storeID}>{item.storeName}
                    <input onChange={() => handleCheck(item.storeID)} name={'checkbox'} type={'checkbox'}
                           checked={item.isChecked}/>
                    {/*{item.images.icon}*/}
                    {/*{item.isActive}*/}
                    {/*{item.storeID}*/}
                    {/*{item.isActive}*/}

                    {/*   thumb: "https://cdn.cloudflare.steamstatic.com/steam/apps*/}
                    {/*   {item.internalName} <img src={item.thumb}/>*/}

                </li>
            ))}
        </ul>
        <h3>Deals</h3>
        {searchGames && searchGames.length && dealsGames.length

            ? dealsGames.map((item, i) => (
                <div key={i}>
                    <a href={`https://www.metacritic.com${item.metacriticLink}`} target="_blank">
                        Title:{item.title}
                        {item.metacriticScore}
                        Rating:{item.dealRating}
                         Date: {new Date(item.releaseDate).toLocaleDateString()}
                        <img src={item.thumb}  alt={item.title} width={100} height={100}/>
                    </a>
                </div>))

            : <p>Empty game list</p>


        }

    </div>
}


export default ShopGames