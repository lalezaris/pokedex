import React from "react"
import styles from "./Details.module.scss"
import { useGetSpeciesDetailQuery } from "../api/apiSlice"
import { useAppSelector } from "../../app/hooks"
import { selectId } from "../search/searchSlice"

export default function Details() {
  const selectedId = useAppSelector(selectId)
  const { data, isError, isLoading, isFetching } =
    useGetSpeciesDetailQuery(selectedId)

  const name = data?.names.find((name) => {
    return name.language.name === "en"
  })?.name

  return (
    <>
      {!isLoading && (
        <div className={styles.detailsBody}>
          <div className={styles.namePlate}>
            <h2>{!isError && name}</h2>
          </div>
          <div
            className={`${styles.spriteContainer} ${
              isFetching ? styles.fetching : ""
            }`}
          >
            {isError && "An error occurred"}
            {data && !isFetching && !isError && (
              <img src={data?.spriteUrl} alt={`A sprite of ${name}`} />
            )}
          </div>
          <div className={styles.infoPane}></div>
        </div>
      )}
    </>
  )
}
