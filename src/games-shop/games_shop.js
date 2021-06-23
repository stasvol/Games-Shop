import React, {useEffect, useState} from "react";
import axios from "axios";


const ShopGames  = () =>{
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const games =
        [
            // "Sir",
            // "Alexa",
            // "Betmen",
            // "Fasad",
            // "Twit",
            // "Lin",
            // "Sink"
        ]
    // useEffect(() => {
    //     const results:any = people.filter(person =>
    //         person.toLowerCase().includes(searchTerm)
    //     );
    //     setSearchResults(results);
    // }, [searchTerm]);

    useEffect(()=>{
      axios.get( 'https://www.cheapshark.com/api/1.0/stores' )
          .then(res=> {
              const result  = res.data
              setSearchResults(result)
              console.log(result)
          })



    },[])




    const handleChange =(e)=> {
        setSearchTerm(e.target.value)

    }
    // const results = !searchTerm
    //     ? games
    //     : games.filter(games => games.includes(searchTerm)
    //     );

    return <div>

            <input onChange={handleChange} type="search" placeholder="Search" value={searchTerm} />


             <h3>Games</h3>
             <span>Empty game list</span>

             <h3>Stores</h3>

        <ul>
            {searchResults.map((item,i) => (
                <li key={i}>{item.storeName} <input type={'checkbox'}/>
                 {/*{item.images.icon}*/}
                 {/*{item.isActive}*/}
                 {/*{item.storeID}*/}
                 {/*{item.isActive}*/}

                </li>
            ))}
        </ul>
        <h3>Deals</h3>
        <span>Empty deals list</span>
    </div>
}

export default ShopGames