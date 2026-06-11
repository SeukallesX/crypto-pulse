import { useEffect, useRef } from 'react'
import { createChart, CandlestickSeries } from 'lightweight-charts'

function PriceChart() {
  const chartContainerRef = useRef(null)

  useEffect(() => {
    if (!chartContainerRef.current) return

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 360,
      layout: {
        background: { color: 'transparent' },
        textColor: '#94a3b8',
      },
      grid: {
        vertLines: { color: 'rgba(148, 163, 184, 0.1)' },
        horzLines: { color: 'rgba(148, 163, 184, 0.1)' },
      },
      timeScale: {
        borderColor: 'rgba(148, 163, 184, 0.2)',
      },
      rightPriceScale: {
        borderColor: 'rgba(148, 163, 184, 0.2)',
      },
    })

    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#22c55e',
      downColor: '#ef4444',
      borderUpColor: '#22c55e',
      borderDownColor: '#ef4444',
      wickUpColor: '#22c55e',
      wickDownColor: '#ef4444',
    })

    fetch(
      'https://api.coingecko.com/api/v3/coins/bitcoin/ohlc?vs_currency=usd&days=7'
    )
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((item) => ({
          time: Math.floor(item[0] / 1000),
          open: item[1],
          high: item[2],
          low: item[3],
          close: item[4],
        }))

        candlestickSeries.setData(formattedData)
        chart.timeScale().fitContent()
      })
      .catch((error) => {
        console.error('Error fetching OHLC data:', error)
      })

    const handleResize = () => {
      chart.applyOptions({
        width: chartContainerRef.current.clientWidth,
      })
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      chart.remove()
    }
  }, [])

  return (
    <section className="chart-card">
      <h2>Bitcoin 7-Day Candlestick Chart</h2>
      <p className="chart-subtitle">
        Green candles show upward movement. Red candles show downward movement.
      </p>

      <div ref={chartContainerRef} className="candlestick-chart"></div>
    </section>
  )
}

export default PriceChart