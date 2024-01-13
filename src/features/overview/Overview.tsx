import React from "react"
import styles from "./Overview.module.scss"
import Details from "../details/Details"
import Search from "../search/Search"

const Overview = () => {
  return (
    <>
      <Details />
      <div className={styles.tabs}>
        <button className={`${styles.tablink} ${styles.active}`}>Search</button>
        <button className={styles.tablink}>History</button>
      </div>

      <Search />
    </>
  )
}

export default Overview
