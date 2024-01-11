import { useState } from "react"
import { useGetSpeciesQuery } from "../api/apiSlice"
import styles from "./Search.module.scss"

export function Search() {
  const { data, isLoading } = useGetSpeciesQuery()

  const [searchValue, setSearchValue] = useState<string>("")

  return (
    <div>
      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <ul className={styles.pokemonList}>
        {isLoading
          ? "loading"
          : data?.results
              .filter((species) =>
                species.name.includes(searchValue.toLowerCase()),
              )
              .map((species) => <li>{species.name}</li>)}
      </ul>
    </div>
  )
}
