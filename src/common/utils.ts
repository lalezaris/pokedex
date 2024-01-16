import { PokemonSpecies } from "pokenode-ts"

export const paddedPokedexNumber = (number: number): string => {
  return String(number).padStart(4, "0")
}

export enum TabName {
  search,
  history,
}

export const findSpeciesName = (data: PokemonSpecies) => {
  return data.names.find((name) => {
    return name.language.name === "en"
  })?.name
}
