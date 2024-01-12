import React from "react"
import { useState } from "react"
import styles from "./Details.module.scss"

export default function Details() {
  return (
    <div className={styles.detailsBody}>
      <div className={styles.namePlate}>
        <h2>Charmander</h2>
      </div>
      <div className={styles.spriteContainer}>
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"
          alt="A sprite of pokemon name"
        />
      </div>
      <div className={styles.infoPane}></div>
    </div>
  )
}
