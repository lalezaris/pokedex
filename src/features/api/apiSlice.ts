import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { NamedAPIResourceList } from "pokenode-ts"

export type SpeciesResponse = {
  name: string
  number: number
  url: string
}

const getPokedexNumber = (url: string): number => {
  const urlParts = url.split("/")
  const num = Number(urlParts[urlParts.length - 2])
  return num
}

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2" }),
  endpoints: (builder) => ({
    getSpecies: builder.query<SpeciesResponse[], void>({
      // Since there is no search endpoint, get all 1025 species to filter locally
      query: () => "/pokemon-species?limit=1025",
      transformResponse: (response: NamedAPIResourceList) => {
        return response.results.map((result) => {
          return {
            name: result.name,
            url: result.url,
            number: getPokedexNumber(result.url),
          }
        })
      },
    }),
  }),
})

export const { useGetSpeciesQuery } = apiSlice
export default apiSlice.reducer
