import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {
  NamedAPIResourceList,
  Pokemon,
  PokemonSpecies,
  PokemonType,
} from "pokenode-ts"

export type SpeciesResponse = {
  name: string
  number: number
  url: string
}

// A Pokemon Species object, with some additional fields from the default
// Pokemon Variation.
export type HydratedPokemonSpecies = PokemonSpecies & {
  spriteUrl: string
  types: PokemonType[]
  height: number
  weight: number
}

const getPokedexNumber = (url: string): number => {
  const urlParts = url.split("/")
  const num = Number(urlParts[urlParts.length - 2])
  return num
}

const getSpeciesQuery = {
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
}

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2" }),
  endpoints: (builder) => ({
    getSpecies: builder.query<SpeciesResponse[], void>(getSpeciesQuery),
    getSpeciesDetail: builder.query<HydratedPokemonSpecies, number>({
      // Using queryFn so I can inject the sprite url from the default
      // variety of a pokemon species.
      // Also, not pulling out this into a defined constant because
      // typescript gets mad.
      queryFn: async (id, _api, _extraOptions, baseQuery) => {
        // Attempt to query the pokemon species
        const speciesDetail = await baseQuery(`/pokemon-species/${id}`)

        // Oops, an error, just return it
        if (speciesDetail.error) {
          return { error: speciesDetail.error }
        }

        // Get the url for the default pokemon variety
        const species = speciesDetail.data as PokemonSpecies
        const defaultPokemonUrl = species.varieties.find(
          (variety) => variety.is_default,
        )?.pokemon.url

        let spriteUrl = ""
        let types: PokemonType[] = []
        let height = 0
        let weight = 0

        // If there is a default variety (I believe all species have one)
        // then attempt to get the details
        if (defaultPokemonUrl) {
          const defaultPokemonDetails = await baseQuery(defaultPokemonUrl)
          if (defaultPokemonDetails.error) {
            return { error: defaultPokemonDetails.error }
          }
          if (defaultPokemonDetails.data) {
            const pokemon = defaultPokemonDetails.data as Pokemon
            spriteUrl = pokemon.sprites.front_default || ""
            types = pokemon.types || []
            height = pokemon.height || 0
            weight = pokemon.weight || 0
          }
        }

        // return the species with spriteUrl injected, or return
        return { data: { ...species, spriteUrl, types, height, weight } }
      },
    }),
  }),
})

export const { useGetSpeciesQuery, useGetSpeciesDetailQuery } = apiSlice
export default apiSlice.reducer
