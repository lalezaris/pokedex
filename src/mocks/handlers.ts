import { http, HttpResponse } from "msw"
import pokemonSpecies from "./pokemonSpecies.json"
import pokemonSpeciesDetail from "./pokemonSpeciesDetail.json"
import pokemonDetail from "./pokemonDetail.json"

export const BASE_URL = "https://pokeapi.co/api/v2"

export const handlers = [
  http.get(`${BASE_URL}/pokemon-species`, () => {
    return HttpResponse.json(pokemonSpecies)
  }),
  http.get(`${BASE_URL}/pokemon-species/:id`, () => {
    return HttpResponse.json(pokemonSpeciesDetail)
  }),
  http.get(`${BASE_URL}/pokemon/:id`, () => {
    return HttpResponse.json(pokemonDetail)
  }),
]
