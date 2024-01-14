import React from "react"
import styles from "./App.module.scss"
import Overview from "./features/overview/Overview"
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom"
import Info from "./features/info/Info"
import Nav from "./features/nav/Nav"

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Overview />,
    },
    {
      path: "/:id",
      element: <Nav />,
      children: [
        {
          path: "info",
          element: <Info />,
        },
      ],
    },
  ])

  return (
    <>
      <header className={styles.header}>
        <h1>Pokédex</h1>
      </header>
      <main className={styles.body}>
        <RouterProvider router={router} />
      </main>
      <footer className={styles.footer}>
        <p>Built by Sam Lalezari</p>
      </footer>
    </>
  )
}

export default App
