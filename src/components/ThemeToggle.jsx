function ThemeToggle({ theme, setTheme }) {
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
    >
      {theme === 'dark'
        ? '☀️ Light Mode'
        : '🌙 Dark Mode'}
    </button>
  )
}

export default ThemeToggle