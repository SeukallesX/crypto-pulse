import { useEffect, useState } from 'react'
import { getTopCryptos } from './services/cryptoApi'

import Navbar from './components/Navbar'
import ThemeToggle from './components/ThemeToggle'
import SearchBar from './components/SearchBar'
import StatsGrid from './components/StatsGrid'
import PortfolioTracker from './components/PortfolioTracker'
import PriceChart from './components/PriceChart'
import CoinCard from './components/CoinCard'
import MarketTable from './components/MarketTable'
import WatchlistSection from './components/WatchlistSection'
import TrendingCoins from './components/TrendingCoins'
import CoinModal from './components/CoinModal'
import Footer from './components/Footer'

import './App.css'

function App() {
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [lastUpdated, setLastUpdated] = useState(null)
  const [selectedCoin, setSelectedCoin] = useState(null)

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark'
  })

  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('watchlist')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const data = await getTopCryptos()
        setCoins(data)
        setLastUpdated(new Date())
      } catch (error) {
        console.error('Error fetching crypto data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCoins()

    const interval = setInterval(fetchCoins, 30000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist))
  }, [watchlist])

  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.body.className = theme === 'light' ? 'light-theme' : ''
  }, [theme])

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  )

  const bitcoin = coins.find((coin) => coin.id === 'bitcoin')
  const ethereum = coins.find((coin) => coin.id === 'ethereum')

  const totalMarketCap = coins.reduce(
    (total, coin) => total + coin.market_cap,
    0
  )

  const totalVolume = coins.reduce(
    (total, coin) => total + coin.total_volume,
    0
  )

  return (
    <main className="app">
      <Navbar />

      <ThemeToggle theme={theme} setTheme={setTheme} />

      <section className="hero-card">
        <p className="tag">LIVE CRYPTO MARKET</p>

        <h1>CryptoPulse</h1>

        <p className="subtitle">
          Monitor live crypto markets, manage your watchlist, track portfolio
          performance, and stay ahead with real-time blockchain analytics.
        </p>

        <div className="actions">
          <button onClick={() => scrollToSection('markets')}>
            📈 Live Markets
          </button>

          <button
            className="secondary"
            onClick={() => scrollToSection('portfolio')}
          >
            💰 Track Portfolio
          </button>
        </div>
      </section>

      <SearchBar search={search} setSearch={setSearch} />

      {lastUpdated && (
        <p className="last-updated">
          🟢 Live • Updated {lastUpdated.toLocaleTimeString()}
        </p>
      )}

      {loading ? (
        <p className="loading">🚀 Connecting to crypto markets...</p>
      ) : (
        <>
          <StatsGrid
            totalMarketCap={totalMarketCap}
            totalVolume={totalVolume}
            bitcoin={bitcoin}
            ethereum={ethereum}
          />

          <PortfolioTracker coins={coins} />

          <WatchlistSection watchlist={watchlist} />

          <TrendingCoins coins={coins} setSelectedCoin={setSelectedCoin} />

          {filteredCoins.length === 0 ? (
            <p className="no-results">No cryptocurrency found.</p>
          ) : (
            <>
              <PriceChart />

              <section className="feature-grid">
                {filteredCoins.slice(0, 10).map((coin) => (
                  <CoinCard
                    key={coin.id}
                    coin={coin}
                    watchlist={watchlist}
                    setWatchlist={setWatchlist}
                    setSelectedCoin={setSelectedCoin}
                  />
                ))}
              </section>

              <MarketTable
                coins={filteredCoins}
                setSelectedCoin={setSelectedCoin}
              />
            </>
          )}
        </>
      )}

      <CoinModal coin={selectedCoin} onClose={() => setSelectedCoin(null)} />

      <Footer />
    </main>
  )
}

export default App