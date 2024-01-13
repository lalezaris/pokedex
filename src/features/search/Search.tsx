import React from "react"
import { useState } from "react"
import { SpeciesResponse, useGetSpeciesQuery } from "../api/apiSlice"
import styles from "./Search.module.scss"
import { useAppDispatch } from "../../app/hooks"
import { pushToHistory, setId } from "./searchSlice"
import { TabName } from "../../common/utils"
import Loading from "../../common/components/Loading"
import Error from "../../common/components/Error"
import PokeList from "./PokeList"
import TabPanel from "../../common/components/TabPanel"

export default function Search() {
  const { data, isLoading, isError } = useGetSpeciesQuery()
  const dispatch = useAppDispatch()

  const [searchValue, setSearchValue] = useState<string>("")

  const handleOnClick = (species: SpeciesResponse): void => {
    dispatch(setId(species.number))
    dispatch(pushToHistory(species))
  }

  return (
    <TabPanel name={TabName.search} className={styles.paneBody}>
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
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value.toLowerCase())}
            placeholder="Filter Pokémon"
            name="Filter Pokemon"
            id="filter-input"
          />
          {data && (
            <PokeList
              pokemon={data}
              filterValue={searchValue}
              onClick={handleOnClick}
            />
          )}
        </>
      )}
    </TabPanel>
  )
}
