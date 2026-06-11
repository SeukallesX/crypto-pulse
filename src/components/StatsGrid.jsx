function StatsGrid({ totalMarketCap, totalVolume, bitcoin, ethereum }) {
  return (
    <section className="stats-grid">
      <div className="stat-card">
        <span>🌎 Total Market Cap</span>
        <h3>${totalMarketCap.toLocaleString()}</h3>
      </div>

      <div className="stat-card">
        <span>🌊 24h Volume</span>
        <h3>${totalVolume.toLocaleString()}</h3>
      </div>

      <div className="stat-card">
        <span>₿ Bitcoin</span>
        <h3>${bitcoin?.current_price.toLocaleString()}</h3>
      </div>

      <div className="stat-card">
        <span>Ξ Ethereum</span>
        <h3>${ethereum?.current_price.toLocaleString()}</h3>
      </div>
    </section>
  )
}

export default StatsGrid