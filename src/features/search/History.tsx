import React from "react"
import { SpeciesResponse } from "../api/apiSlice"
import styles from "./Search.module.scss"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectHistory, setId } from "./searchSlice"
import { TabName } from "../../common/utils"
import PokeList from "./PokeList"
import TabPanel from "../../common/components/TabPanel"

export default function History() {
  const dispatch = useAppDispatch()
  const history = useAppSelector(selectHistory)

  const handleOnClick = (species: SpeciesResponse): void => {
    dispatch(setId(species.number))
  }

  return (
    <TabPanel name={TabName.history} className={styles.paneBody}>
      {history.length > 0 ? (
        <PokeList pokemon={history} onClick={handleOnClick} />
      ) : (
        <p className={styles.statusText}>no history</p>
      )}
    </TabPanel>
  )
}
