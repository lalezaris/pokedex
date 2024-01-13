import React from "react"
import { useState } from "react"
import { SpeciesResponse, useGetSpeciesQuery } from "../api/apiSlice"
import styles from "./Search.module.scss"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { pushToHistory, selectId, setId } from "./searchSlice"
import { TabName, paddedPokedexNumber } from "../../common/utils"
import Loading from "../../common/components/Loading"
import Error from "../../common/components/Error"

export default function Search() {
  const { data, isLoading, isError } = useGetSpeciesQuery()
  const dispatch = useAppDispatch()
  const selectedId = useAppSelector(selectId)

  const [searchValue, setSearchValue] = useState<string>("")

  const handleOnClick = (species: SpeciesResponse): void => {
    dispatch(setId(species.number))
    dispatch(pushToHistory(species))
  }

  return (
    <div
      role="tabpanel"
      aria-labelledby={`tab-${TabName.search}`}
      className={styles.paneBody}
      id={`tabcontent-${TabName.search}`}
    >
      {isLoading ? (
        <div className={styles.statusText}>
          <Loading />
        </div>
      ) : isError ? (
        <div className={styles.statusText}>
          <Error />
        </div>
      ) : (
        <>
          {" "}
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value.toLowerCase())}
            placeholder="Filter Pokémon"
          />
          {data && (
            <ul className={styles.searchList}>
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
        </>
      )}
    </div>
  )
}
