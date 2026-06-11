function TrendingCoins({ coins, setSelectedCoin }) {
  const trendingCoins = [...coins]
    .filter((coin) => coin.price_change_percentage_24h !== null)
    .sort(
      (a, b) =>
        b.price_change_percentage_24h - a.price_change_percentage_24h
    )
    .slice(0, 5)

  return (
    <section className="trending-section">
      <h2>🔥 Trending Coins</h2>

      <div className="trending-grid">
        {trendingCoins.map((coin) => (
          <button
            className="trending-card"
            key={coin.id}
            onClick={() => setSelectedCoin(coin)}
          >
            <img src={coin.image} alt={coin.name} />

            <div>
              <h3>{coin.name}</h3>
              <p>{coin.symbol.toUpperCase()}</p>
            </div>

            <span className="green">
              +{coin.price_change_percentage_24h.toFixed(2)}%
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}

export default TrendingCoins