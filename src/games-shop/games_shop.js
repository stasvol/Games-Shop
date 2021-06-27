import React, {useEffect, useState} from "react";
import axios from "axios";


const ShopGames  = () =>{

    const [searchResults, setSearchResults] = useState([]);

    const [searchQuery, setSearchQuery] = useState("");
    const [searchGames , setSearchGames] = useState([]);

    const [isChecked, setIsChecked] = useState(false);

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
    const title = searchQuery

    useEffect(()=>{
      axios.get
      // ( `${BASE_PATH}${ADDITIONAL_PATH}`)
          ('https://www.cheapshark.com/api/1.0/stores' )

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

    const setAxiosResult =result=> {
        setSearchResults(result)
    }

    const axiosData = (searchQuery) => {
        setSearchQuery(searchQuery)
        axios.get
        (`https://www.cheapshark.com/api/1.0/games?title=${searchQuery}`)
        //     (`${BASE_PATH}${ADDITIONAL_PATH_2}?${storeID}${title}`)
            .then(res=> {
                const games = res.data
                setSearchGames(games)
                console.log(games)
            })
            .catch(error=> console.error('Error '+ error))

    }



    const getSearch =(e)=> {
        if (e.key  ===  'Enter') {
            setSearchQuery(searchQuery)
            // setSearchGames(searchGames )
            axiosData(searchQuery)
        }
        // axiosData(searchQuery)
        setIsChecked(false)
    }

    const handleChange =(e)=> {

        setSearchQuery(e.target.value)

    }
    // const results = !searchTerm
    //     ? games
    //     : games.filter(games => games.includes(searchTerm)
    //     );
   const handleCheck = (i) =>{

        const arr = searchResults;
        arr[i].isChecked = !arr[i].isChecked

       setIsChecked({
           searchResults: arr
        })
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

            <input onKeyPress={getSearch} onChange={handleChange} type="search" placeholder="Search" value={searchQuery} />


             <h3>Games</h3>
        { searchGames && searchGames.length

            ?   searchGames.map((item,i) =>(
                <div key={i}>{item.internalName} </div>))
                // .filter(elem => elem.title !== searchQuery)
                // <span key={i}>{item.internalName}  {item.title} <img src={item.thumb}/> </span>))

            :   <p>Empty game list</p>


        }


             <h3>Stores</h3>

        <ul>
            {searchResults.map((item,i) => (
                <li key={item.storeID}>{item.storeName} <input onChange={
                    ()=> handleCheck(i)}
                    // ()=> { if (searchResults.filter(el=>el===item.storeName)) setIsChecked(!isChecked)}}
                    // ()=> { if (item.storeName !== checkValue  ) setCheckValue(!checkValue)}}
                                                               name={'checkbox'} type={'checkbox'} checked={isChecked}/>

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
        { searchGames && searchGames.length && isChecked===true

            ?   searchGames.map((item,i) =>(
                <div key={i}><a href={'#'}>Title:{item.external}Rating:{item.steamAppID}</a> <img src={item.thumb}/></div>))
            // .filter(elem => elem.title !== searchQuery)
            // <span key={i}>{item.internalName}  {item.title} <img src={item.thumb}/> </span>))

            :   <p>Empty game list</p>


        }
        {/*<p>Empty deals list</p>*/}
    </div>
}


export default ShopGames