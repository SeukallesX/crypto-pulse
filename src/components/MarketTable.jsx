function MarketTable({ coins, setSelectedCoin }) {
  return (
    <section id="markets" className="market-table">
      <h2>Top 10 Crypto Market</h2>

      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Coin</th>
            <th>Price</th>
            <th>24h Change</th>
            <th>Market Cap</th>
          </tr>
        </thead>

        <tbody>
          {coins.slice(0, 10).map((coin) => (
            <tr
              key={coin.id}
              onClick={() => setSelectedCoin(coin)}
              className="clickable-row"
            >
              <td>#{coin.market_cap_rank}</td>

              <td className="coin-name">
                <img src={coin.image} alt={coin.name} className="table-icon" />
                {coin.name}
              </td>

              <td>${coin.current_price.toLocaleString()}</td>

              <td
                className={
                  coin.price_change_percentage_24h >= 0 ? 'green' : 'red'
                }
              >
                {coin.price_change_percentage_24h.toFixed(2)}%
              </td>

              <td>${coin.market_cap.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default MarketTable