import {useShopGames} from "../hock/useShopGames";
import Games from "./games";
import Stores from "./stores";
import Deals from "./deals";

const ShopGames = () => {

    const {searchResults, searchQuery, searchGames, dealsGames, getSearch, handleChange, handleCheck} = useShopGames()

    return <>

        <input onKeyPress={getSearch} onChange={handleChange} type="search" placeholder="Search" value={searchQuery}/>
        <Games searchGames={searchGames} handleCheck={handleCheck}/>
        <Stores searchResults={searchResults} handleCheck={handleCheck}/>
        <Deals searchGames={searchGames} dealsGames={dealsGames}/>

    </>
}


export default ShopGames