import React, {useEffect, useState} from "react";
import axios from "axios";


const ShopGames  = () =>{

    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchGames , setSearchGames] = useState([]);

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
    const ADDITIONAL_PATH = 'stores'
    const ADDITIONAL_PATH_2 = 'deals'
    const storeID= []
    const title = ''

    useEffect(()=>{
      axios.get( `${BASE_PATH}${ADDITIONAL_PATH}`)
          // 'https://www.cheapshark.com/api/1.0/stores' )

          // .then(res=> {
          //     const result  = res.data
          //     setSearchResults(result)
          //     console.log(result)
          // })

          .then(res=> res.data)
          .then(result => setAxiosResult(result))
          .catch(error=> console.error('Error '+ error ))

        // https://www.cheapshark.com/api/1.0/deals?storeID=1,2,3&title=batman
        // https://www.cheapshark.com/api/1.0/stores

    },[])


    const axiosData = (searchQuery) => {

        axios.get
        // ('https://www.cheapshark.com/api/1.0/deals?storeID=1,2,3&title=batman')
            (`${BASE_PATH}${ADDITIONAL_PATH_2}?${storeID}${title}`)
            .then(res=> {
                const games = res.data
                setSearchGames(games)

            })
            .catch(error=> console.error('Error '+ error))
        console.log(searchGames)
    }

   const setAxiosResult =result=> {
       setSearchResults(result)
   }
    console.log(searchGames)

    const getSearch =(key)=> {
        if (key  ===  'Enter') {
            setSearchQuery(searchQuery)


        }
        axiosData(searchQuery)
        console.log("ONE"+  searchQuery)

    }

    const handleChange =(e)=> {
        setSearchQuery(e.target.value)
        console.log("TWO"+  searchQuery)

    }
    // const results = !searchTerm
    //     ? games
    //     : games.filter(games => games.includes(searchTerm)
    //     );

    return <div>

            <input onKeyPress={getSearch} onChange={handleChange} type="search" placeholder="Search" value={searchQuery} />


             <h3>Games</h3>
        { searchGames && searchGames.length

            ?   searchGames.map((item,i) =>(
                <div key={i}>{item.internalName} </div>)).filter(title => title !== searchQuery)
                // <span key={i}>{item.internalName}  {item.title} <img src={item.thumb}/> </span>))

            : <p>Empty game list</p>


        }


             <h3>Stores</h3>

        <ul>
            {searchResults.map((item,i) => (
                <li key={item.storeID}>{item.storeName} <input type={'checkbox'}/>

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
        <p>Empty deals list</p>
    </div>
}

export default ShopGames