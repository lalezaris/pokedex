import React, { useState } from "react"
import styles from "./Overview.module.scss"
import Details from "../details/Details"
import Search from "../search/Search"
import History from "../search/History"
import { TabName } from "../../common/utils"

type TabButtonProps = {
  name: TabName
  activeTab: TabName
  onClick: (tab: TabName) => void
  children: React.ReactNode
}
const TabButton = ({ name, activeTab, onClick, children }: TabButtonProps) => {
  const tabClasses = (tab: TabName) =>
    `${styles.tablink} ${activeTab === tab ? styles.active : ""}`

  return (
    <button
      role="tab"
      onClick={() => onClick(name)}
      className={tabClasses(name)}
      aria-selected={activeTab === name}
      aria-controls={`tabcontent-${name}`}
      id={`tab-${name}`}
    >
      {children}
    </button>
  )
}

const Overview = () => {
  const [activeTab, setActiveTab] = useState<TabName>(TabName.search)

  const handleOnClick = (tab: TabName) => {
    setActiveTab(tab)
  }

  return (
    <div className={styles.overviewBody}>
      <Details />
      <div role="tablist" className={styles.tabs}>
        <TabButton
          name={TabName.search}
          activeTab={activeTab}
          onClick={handleOnClick}
        >
          Search
        </TabButton>
        <TabButton
          name={TabName.history}
          activeTab={activeTab}
          onClick={handleOnClick}
        >
          History
        </TabButton>
      </div>
      {activeTab === TabName.search && <Search />}
      {activeTab === TabName.history && <History />}
    </div>
  )
}

export default Overview
