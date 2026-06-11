import { useState } from 'react'

function PortfolioTracker({ coins }) {
  const [btcAmount, setBtcAmount] = useState('')
  const [ethAmount, setEthAmount] = useState('')
  const [solAmount, setSolAmount] = useState('')

  const bitcoin = coins.find((coin) => coin.id === 'bitcoin')
  const ethereum = coins.find((coin) => coin.id === 'ethereum')
  const solana = coins.find((coin) => coin.id === 'solana')

  const btcValue =
    (Number(btcAmount) || 0) *
    (bitcoin?.current_price || 0)

  const ethValue =
    (Number(ethAmount) || 0) *
    (ethereum?.current_price || 0)

  const solValue =
    (Number(solAmount) || 0) *
    (solana?.current_price || 0)

  const totalValue =
    btcValue +
    ethValue +
    solValue

  return (
    <section id="portfolio" className="portfolio-card">
      <h2>💰 Portfolio Tracker</h2>

      <div className="portfolio-inputs">
        <input
          type="number"
          placeholder="BTC Amount"
          value={btcAmount}
          onChange={(e) => setBtcAmount(e.target.value)}
        />

        <input
          type="number"
          placeholder="ETH Amount"
          value={ethAmount}
          onChange={(e) => setEthAmount(e.target.value)}
        />

        <input
          type="number"
          placeholder="SOL Amount"
          value={solAmount}
          onChange={(e) => setSolAmount(e.target.value)}
        />
      </div>

      <div className="portfolio-total">
        Total Portfolio Value: ${totalValue.toLocaleString()}
      </div>

      <div className="portfolio-breakdown">
        <p>
          BTC Value: ${btcValue.toLocaleString()}
        </p>

        <p>
          ETH Value: ${ethValue.toLocaleString()}
        </p>

        <p>
          SOL Value: ${solValue.toLocaleString()}
        </p>
      </div>
    </section>
  )
}

export default PortfolioTracker