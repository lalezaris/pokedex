import logo from "./logo.svg"
import { Counter } from "./features/counter/Counter"
import "./App.css"
import { Search } from "./features/search/Search"

function App() {
  return (
    <>
      <header>
        <h1>Pokedex</h1>
      </header>
      <body>
        <Search />
      </body>
      <footer>
        <p>Designed by Sam Lalezari</p>
      </footer>
    </>
  )
}

export default App
