import React from "react"
import { SpeciesResponse } from "../api/apiSlice"
import styles from "./Search.module.scss"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectHistory, selectId, setId } from "./searchSlice"
import { TabName } from "../../common/utils"
import PokeList from "./PokeList"

export default function History() {
  const dispatch = useAppDispatch()
  const history = useAppSelector(selectHistory)

  const handleOnClick = (species: SpeciesResponse): void => {
    dispatch(setId(species.number))
  }

  return (
    <div
      role="tabpanel"
      aria-labelledby={`tab-${TabName.history}`}
      className={styles.paneBody}
      id={`tabcontent-${TabName.history}`}
    >
      {history.length > 0 ? (
        <PokeList pokemon={history} onClick={handleOnClick} />
      ) : (
        <p className={styles.statusText}>no history</p>
      )}
    </div>
  )
}
