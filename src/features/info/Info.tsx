import React from "react"
import styles from "./Info.module.scss"
import { findSpeciesName, paddedPokedexNumber } from "../../common/utils"
import { useGetSpeciesDetailQuery } from "../api/apiSlice"
import { useParams } from "react-router-dom"
import Loading from "../../common/components/Loading"
import Error from "../../common/components/Error"

const Info = () => {
  const { id } = useParams()

  const { data, isError, isFetching } = useGetSpeciesDetailQuery(Number(id))

  const name = data ? findSpeciesName(data) : ""

  if (isFetching) {
    return <Loading />
  }

  if (isError) {
    return <Error />
  }

  if (!data) {
    return <div>pokemon not found</div>
  }
  return (
    <div className={styles.infoPane}>
      <div className={styles.sprite}>
        <img alt={`A sprite of ${name}`} src={data.spriteUrl} />
      </div>
      <div className={styles.nameBox}>
        <h2>
          {data?.id && paddedPokedexNumber(data.id)} {name}
        </h2>
        <p>
          {data?.genera.find((genus) => genus.language.name === "en")?.genus}
        </p>
      </div>
      <div className={styles.typeBoxes}>
        <ul>
          {data?.types.map((type, i) => (
            <li key={i}>{type.type.name}</li>
          ))}
        </ul>
      </div>
      <div className={styles.statsBox}>
        <table>
          <tbody>
            <tr>
              <td>Height</td>
              <td>{data?.height / 10} m</td>
            </tr>
            <tr>
              <td>Weight</td>
              <td>{data?.weight / 10} kg</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.flavorText}>
        <p>
          {
            data.flavor_text_entries.find(
              (entry) => entry.language.name === "en",
            )?.flavor_text
          }
        </p>
      </div>
    </div>
  )
}

export default Info
