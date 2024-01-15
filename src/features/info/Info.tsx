import React from "react"
import styles from "./Info.module.scss"

const Info = () => {
  return (
    <div className={styles.infoPane}>
      <div className={styles.sprite}>
        <img
          alt={`A sprite of ${name}`}
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
        />
      </div>
      <div className={styles.nameBox}>
        <h2>025 Pikachu</h2>
        <p>Mouse Pokemon</p>
      </div>
      <div className={styles.typeBoxes}>
        <ul>
          <li>ELECTR</li>
        </ul>
      </div>
      <div className={styles.statsBox}>
        <table>
          <tbody>
            <tr>
              <td>Height</td>
              <td>0.4 m</td>
            </tr>
            <tr>
              <td>Weight</td>
              <td>6.0 kg</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.flavorText}>
        <p>
          It stores electricity in the electric sacs on its cheeks. When it
          releases pent-up energy in a burst, the electric power is equal to a
          lightning bolt.
        </p>
      </div>
    </div>
  )
}

export default Info
