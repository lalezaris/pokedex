import React from "react"
import styles from "./App.module.scss"
import Search from "./features/search/Search"

function App() {
  return (
    <>
      <header className={styles.header}>
        <h1>Pokédex</h1>
      </header>
      <body className={styles.body}>
        <Search />
      </body>
      <footer className={styles.footer}>
        <p>Designed by Sam Lalezari</p>
      </footer>
    </>
  )
}

export default App
