function CoinModal({ coin, onClose }) {
  if (!coin) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="coin-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <img src={coin.image} alt={coin.name} className="modal-icon" />

        <h2>{coin.name}</h2>
        <p className="modal-symbol">{coin.symbol.toUpperCase()}</p>

        <div className="modal-price">
          ${coin.current_price.toLocaleString()}
        </div>

        <span
          className={
            coin.price_change_percentage_24h >= 0
              ? 'modal-badge green-badge'
              : 'modal-badge red-badge'
          }
        >
          {coin.price_change_percentage_24h >= 0 ? '▲' : '▼'}{' '}
          {coin.price_change_percentage_24h.toFixed(2)}% today
        </span>

        <div className="modal-details">
          <p><strong>Rank:</strong> #{coin.market_cap_rank}</p>
          <p><strong>Market Cap:</strong> ${coin.market_cap.toLocaleString()}</p>
          <p><strong>Volume:</strong> ${coin.total_volume.toLocaleString()}</p>
          <p><strong>Symbol:</strong> {coin.symbol.toUpperCase()}</p>
        </div>
      </div>
    </div>
  )
}

export default CoinModal