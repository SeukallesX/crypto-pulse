function WatchlistSection({ watchlist }) {
  if (watchlist.length === 0) {
    return (
      <section className="watchlist-section">
        <h2>⭐ Your Watchlist</h2>

        <p className="empty-watchlist">
          No coins saved yet. Add coins using the watchlist button.
        </p>
      </section>
    )
  }

  return (
    <section className="watchlist-section">
      <h2>⭐ Your Watchlist</h2>

      <div className="watchlist-grid">
        {watchlist.map((coin) => (
          <div className="watchlist-card" key={coin.id}>
            <img src={coin.image} alt={coin.name} />

            <span>{coin.name}</span>

            <strong>
              ${coin.current_price.toLocaleString()}
            </strong>
          </div>
        ))}
      </div>
    </section>
  )
}

export default WatchlistSection