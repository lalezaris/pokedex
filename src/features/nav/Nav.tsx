import React from "react"
import { Link, NavLink, Outlet } from "react-router-dom"

const Nav = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <NavLink to="info">Info</NavLink>
          </li>
          {/* <li>
            <NavLink to="evolution">Evolution</NavLink>
          </li> */}
        </ul>
      </nav>
      <Outlet />
    </div>
  )
}

export default Nav
