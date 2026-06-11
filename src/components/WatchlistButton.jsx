function WatchlistButton({ coin, watchlist, setWatchlist }) {
  const isSaved = watchlist.some((item) => item.id === coin.id)

  const toggleWatchlist = () => {
    if (isSaved) {
      setWatchlist(watchlist.filter((item) => item.id !== coin.id))
    } else {
      setWatchlist([...watchlist, coin])
    }
  }

  return (
    <button className="watchlist-btn" onClick={toggleWatchlist}>
      {isSaved ? '★ Saved' : '☆'}
    </button>
  )
}

export default WatchlistButton