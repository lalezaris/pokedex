import React from "react"
import { useState } from "react"
import { useGetSpeciesQuery } from "../api/apiSlice"
import styles from "./Search.module.scss"

const Loading = () => <div>loading</div>
const Error = () => <div>an error occurred</div>

const paddedPokedexNumber = (number: number): string => {
  return String(number).padStart(4, "0")
}

export default function Search() {
  const { data, isLoading, error } = useGetSpeciesQuery()

  const [searchValue, setSearchValue] = useState<string>("")

  if (isLoading) {
    return <Loading />
  } else if (error) {
    return <Error />
  }

  return (
    <div className={styles.searchBody}>
      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Filter Pokémon"
      />
      {data && (
        <ul className={styles.pokemonList}>
          {data
            ?.filter((species) =>
              species.name.includes(searchValue.toLowerCase()),
            )
            .map((species) => (
              <li key={species.number}>
                {paddedPokedexNumber(species.number)} {species.name}
              </li>
            ))}
        </ul>
      )}
    </div>
  )
}
