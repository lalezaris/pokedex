import React from "react"
import styles from "./Details.module.scss"
import { useGetSpeciesDetailQuery } from "../api/apiSlice"
import { useAppSelector } from "../../app/hooks"
import { selectId } from "../search/searchSlice"

export default function Details() {
  const selectedId = useAppSelector(selectId)
  const { data, isError, isLoading, isFetching } =
    useGetSpeciesDetailQuery(selectedId)

  return (
    <>
      {!isLoading && (
        <div className={styles.detailsBody}>
          <div className={styles.namePlate}>
            <h2>
              {
                data?.names.find((name) => {
                  return name.language.name === "en"
                })?.name
              }
            </h2>
          </div>
          <div
            className={`${styles.spriteContainer} ${
              isFetching ? styles.fetching : ""
            }`}
          >
            {isError && "An error occurred"}
            {data && !isFetching && (
              <img src={data?.spriteUrl} alt={`A sprite of ${data?.name}`} />
            )}
          </div>
          <div className={styles.infoPane}></div>
        </div>
      )}
    </>
  )
}
