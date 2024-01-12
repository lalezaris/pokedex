import { http, HttpResponse } from "msw"
import pokemonSpecies from "./pokemonSpecies.json"

export const BASE_URL = "https://pokeapi.co/api/v2"

export const handlers = [
  http.get(`${BASE_URL}/pokemon-species`, () => {
    return HttpResponse.json(pokemonSpecies)
  }),
]
