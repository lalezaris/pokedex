import React, { useState } from "react"
import styles from "./Overview.module.scss"
import Details from "../details/Details"
import Search from "../search/Search"
import History from "../search/History"

enum TabName {
  search,
  history,
}

const Overview = () => {
  const [activeTab, setActiveTab] = useState<TabName>(TabName.search)

  const handleOnClick = (tab: TabName) => {
    setActiveTab(tab)
  }

  const tabClasses = (tab) =>
    `${styles.tablink} ${activeTab === tab ? styles.active : ""}`

  return (
    <>
      <Details />
      <div className={styles.tabs}>
        <button
          onClick={() => handleOnClick(TabName.search)}
          className={tabClasses(TabName.search)}
        >
          Search
        </button>
        <button
          onClick={() => handleOnClick(TabName.history)}
          className={tabClasses(TabName.history)}
        >
          History
        </button>
      </div>
      {activeTab === TabName.search && <Search />}
      {activeTab === TabName.history && <History />}
    </>
  )
}

export default Overview
