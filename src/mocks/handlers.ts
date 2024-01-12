import { http, HttpResponse } from "msw"
import pokemonSpecies from "./pokemonSpecies.json"
import pokemonSpeciesDetail from "./pokemonSpeciesDetail.json"
import pokemonDetail from "./pokemonDetail.json"

export const BASE_URL = "https://pokeapi.co/api/v2"

export const handlers = [
  http.get(`${BASE_URL}/pokemon-species`, () => {
    return HttpResponse.json(pokemonSpecies)
  }),
  http.get(`${BASE_URL}/pokemon-species/:id`, ({ params }) => {
    const { id } = params
    return HttpResponse.json({ ...pokemonSpeciesDetail, id })
  }),
  http.get(`${BASE_URL}/pokemon/:id`, ({ params }) => {
    const { id } = params
    return HttpResponse.json({ ...pokemonDetail, id })
  }),
]
