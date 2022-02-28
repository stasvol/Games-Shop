const Deals = ({searchGames, dealsGames}) => (
    <>
        <h3>Deals</h3>
        {searchGames && searchGames.length && dealsGames.length
            ? dealsGames.map(({dealID, metacriticLink, title, metacriticScore, dealRating, releaseDate, thumb}) => (
                <div key={dealID}>
                    <a href={`https://www.metacritic.com${metacriticLink}`} target="_blank" rel="noreferrer">
                        Title:{title}
                        {metacriticScore}
                        Rating:{dealRating}
                        Date: {new Date(releaseDate).toLocaleDateString()}
                        <img src={thumb} alt={title} className='images'/>
                    </a>
                </div>))
            : <p>Empty game list</p>
        }
    </>
)

export default Deals