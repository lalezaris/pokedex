import React from "react"
import { useState } from "react"
import { SpeciesResponse, useGetSpeciesQuery } from "../api/apiSlice"
import styles from "./Search.module.scss"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { pushToHistory, selectId, setId } from "./searchSlice"
import { paddedPokedexNumber } from "../../common/utils"
import Loading from "../../common/components/Loading"
import Error from "../../common/components/Error"

export default function Search() {
  const { data, isLoading, error } = useGetSpeciesQuery()
  const dispatch = useAppDispatch()
  const selectedId = useAppSelector(selectId)

  const [searchValue, setSearchValue] = useState<string>("")

  const handleOnClick = (species: SpeciesResponse): void => {
    dispatch(setId(species.number))
    dispatch(pushToHistory(species))
  }

  if (isLoading) {
    return <Loading />
  } else if (error) {
    return <Error />
  }

  return (
    <div className={styles.searchBody}>
      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value.toLowerCase())}
        placeholder="Filter Pokémon"
      />

      {data && (
        <ul className={styles.pokemonList}>
          {data
            ?.filter(
              (species) =>
                species.name.includes(searchValue) ||
                paddedPokedexNumber(species.number).includes(searchValue),
            )
            .map((species) => (
              <li
                key={species.number}
                className={
                  species.number === selectedId ? styles.active : undefined
                }
              >
                <button
                  disabled={species.number === selectedId}
                  onClick={() => handleOnClick(species)}
                >
                  {paddedPokedexNumber(species.number)} {species.name}
                </button>
              </li>
            ))}
        </ul>
      )}
    </div>
  )
}
