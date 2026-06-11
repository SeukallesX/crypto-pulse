import WatchlistButton from './WatchlistButton'

function CoinCard({ coin, watchlist, setWatchlist, setSelectedCoin }) {
  return (
    <div
      className="feature-card"
      onClick={() => setSelectedCoin(coin)}
    >
      <h2>
        <img src={coin.image} alt={coin.name} className="coin-icon" />
        {coin.name}
      </h2>

      <p>${coin.current_price.toLocaleString()}</p>

      <div className="coin-info">
        <span>Rank #{coin.market_cap_rank}</span>
        <span>Market Cap: ${coin.market_cap.toLocaleString()}</span>
        <span>Volume: ${coin.total_volume.toLocaleString()}</span>
      </div>

      <span className={coin.price_change_percentage_24h >= 0 ? 'green' : 'red'}>
        {coin.price_change_percentage_24h.toFixed(2)}%
      </span>

      <WatchlistButton
        coin={coin}
        watchlist={watchlist}
        setWatchlist={setWatchlist}
      />
    </div>
  )
}

export default CoinCard