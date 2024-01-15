import React from "react"
import { Link, NavLink, Outlet } from "react-router-dom"
import styles from "./Nav.module.scss"
import homeIcon from "../../resources/home.svg"

const Nav = () => {
  return (
    <div className={styles.navBody}>
      <nav className={styles.navBar}>
        <ul style={{ margin: "0" }}>
          <li>
            <Link to="/">
              <img src={homeIcon} alt="Home icon" />
            </Link>
          </li>
          <li>
            <NavLink to="info">Info</NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  )
}

export default Nav
