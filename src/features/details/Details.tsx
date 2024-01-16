import React from "react"
import styles from "./Details.module.scss"
import { useGetSpeciesDetailQuery } from "../api/apiSlice"
import { useAppSelector } from "../../app/hooks"
import { selectId } from "../search/searchSlice"
import Error from "../../common/components/Error"
import { Link } from "react-router-dom"
import { findSpeciesName } from "../../common/utils"

export default function Details() {
  const selectedId = useAppSelector(selectId)
  const { data, isError, isFetching } = useGetSpeciesDetailQuery(selectedId)

  const name = data ? findSpeciesName(data) : ""

  return (
    <>
      <div className={styles.detailsBody}>
        <div className={styles.namePlate}>
          <h2>{!isError && name}</h2>
        </div>
        <div
          className={`${styles.spriteContainer} ${
            isFetching ? styles.fetching : ""
          }`}
        >
          {isError && <Error />}
          {data &&
            !isFetching &&
            !isError &&
            (data.spriteUrl ? (
              <img src={data?.spriteUrl} alt={`A sprite of ${name}`} />
            ) : (
              "No sprite found."
            ))}
        </div>
        <div className={styles.infoPane}>
          <Link to={`/${data?.id}/info`}>Info</Link>
        </div>
      </div>
    </>
  )
}
