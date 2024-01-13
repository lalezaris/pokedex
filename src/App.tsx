import React from "react"
import styles from "./App.module.scss"
import Overview from "./features/overview/Overview"

function App() {
  return (
    <>
      <header className={styles.header}>
        <h1>Pokédex</h1>
      </header>
      <main className={styles.body}>
        <Overview />
      </main>
      <footer className={styles.footer}>
        <p>Designed by Sam Lalezari</p>
      </footer>
    </>
  )
}

export default App
