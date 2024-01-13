import React from "react"
import { SpeciesResponse } from "../api/apiSlice"
import styles from "./Search.module.scss"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectHistory, selectId, setId } from "./searchSlice"
import { paddedPokedexNumber } from "../../common/utils"

export default function History() {
  const dispatch = useAppDispatch()
  const history = useAppSelector(selectHistory)
  const selectedId = useAppSelector(selectId)

  const handleOnClick = (species: SpeciesResponse): void => {
    dispatch(setId(species.number))
  }

  return (
    <div className={styles.searchBody}>
      <ul className={styles.pokemonList}>
        {history.map((species) => (
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
    </div>
  )
}
