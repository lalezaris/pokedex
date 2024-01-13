export const paddedPokedexNumber = (number: number): string => {
  return String(number).padStart(4, "0")
}

export enum TabName {
  search,
  history,
}
