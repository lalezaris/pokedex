import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { NamedAPIResourceList } from "pokenode-ts"

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2" }),
  endpoints: (builder) => ({
    getSpecies: builder.query<NamedAPIResourceList, void>({
      // Since there is no search endpoint, get all 1025 species to filter locally
      query: () => "/pokemon-species?limit=1025",
    }),
  }),
})

export const { useGetSpeciesQuery } = apiSlice
export default apiSlice.reducer
