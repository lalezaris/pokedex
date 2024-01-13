import React from "react"
import { useAppSelector } from "../../app/hooks"
import { SpeciesResponse } from "../api/apiSlice"
import { selectId } from "./searchSlice"
import styles from "./Search.module.scss"
import { paddedPokedexNumber } from "../../common/utils"

type PokeListProps = {
  pokemon: SpeciesResponse[]
  filterValue?: string
  onClick?: (species: SpeciesResponse) => void
}
const PokeList = ({ pokemon, filterValue = "", onClick }: PokeListProps) => {
  const selectedId = useAppSelector(selectId)

  const handleOnClick = (species: SpeciesResponse) => {
    if (onClick) {
      onClick(species)
    }
  }

  return (
    <ul className={styles.searchList}>
      {pokemon
        ?.filter(
          (species) =>
            species.name.includes(filterValue) ||
            paddedPokedexNumber(species.number).includes(filterValue),
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
  )
}

export default PokeList
