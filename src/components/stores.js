const Stores = ({searchResults, handleCheck}) => (
    <>
        <h3>Stores</h3>
        <ul className={'items'}>
            {searchResults?.length && searchResults.map(({storeID, storeName, isChecked}) => {
                const handleChange = () => {
                    handleCheck(storeID)
                }
                return (
                    <li key={storeID}>
                        {storeName}
                        <input onChange={handleChange} name={'checkbox'} type={'checkbox'}
                               checked={isChecked}/>
                    </li>
                )
            })}
        </ul>
    </>
)

export default Stores