import React from "react"
import styles from "./App.module.scss"
import Search from "./features/search/Search"
import Details from "./features/details/Details"

function App() {
  return (
    <>
      <header className={styles.header}>
        <h1>Pokédex</h1>
      </header>
      <body className={styles.body}>
        <Details />
        <Search />
      </body>
      <footer className={styles.footer}>
        <p>Designed by Sam Lalezari</p>
      </footer>
    </>
  )
}

export default App
