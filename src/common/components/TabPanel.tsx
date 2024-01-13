import React from "react"
import { TabName } from "../utils"

type TabPanelProps = {
  name: TabName
  children: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>

const TabPanel = ({ name, children, ...props }: TabPanelProps) => {
  return (
    <div
      role="tabpanel"
      aria-labelledby={`tab-${name}`}
      id={`tabcontent-${name}`}
      {...props}
    >
      {children}
    </div>
  )
}

export default TabPanel
