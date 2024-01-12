import React from "react"
import { useState } from "react"
import { useGetSpeciesQuery } from "../api/apiSlice"
import styles from "./Search.module.scss"

const Loading = () => <div>loading</div>
const Error = () => <div>an error occurred</div>

export default function Search() {
  const { data, isLoading, error } = useGetSpeciesQuery()

  const [searchValue, setSearchValue] = useState<string>("")

  if (isLoading) {
    return <Loading />
  } else if (error) {
    return <Error />
  }

  return (
    <div>
      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {data && (
        <ul className={styles.pokemonList}>
          {data?.results
            .filter((species) =>
              species.name.includes(searchValue.toLowerCase()),
            )
            .map((species, index) => (
              <li key={index}>{species.name}</li>
            ))}
        </ul>
      )}
    </div>
  )
}
