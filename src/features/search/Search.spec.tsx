import React from "react"
import { fireEvent, screen } from "@testing-library/react"
import Search from "./Search"
import { renderWithProviders } from "../../utils/testUtils"
import { server } from "../../mocks/node"
import { HttpResponse, http } from "msw"
import pokemonSpecies from "../../mocks/pokemonSpecies.json"
import { BASE_URL } from "../../mocks/handlers"

describe("Search", () => {
  it("displays loading while fetching data, then displays pokemon name on success", async () => {
    renderWithProviders(<Search />)

    expect(screen.getByText("loading")).toBeInTheDocument()
    expect(await screen.findByText("0001 bulbasaur")).toBeInTheDocument()
  })
  it("displays loading while fetching, then error if api call fails", async () => {
    server.use(
      http.get(`${BASE_URL}/pokemon-species`, () => {
        return new HttpResponse(null, {
          status: 500,
          statusText: "something went wrong",
        })
      }),
    )

    renderWithProviders(<Search />)

    expect(screen.getByText("loading")).toBeInTheDocument()
    expect(await screen.findByText("an error occurred")).toBeInTheDocument()
  })
  it("filters list when text is entered in the input", async () => {
    renderWithProviders(<Search />)

    expect(screen.getByText("loading")).toBeInTheDocument()
    expect(await screen.findByText("0001 bulbasaur")).toBeInTheDocument()

    const input = screen.getByRole<HTMLInputElement>("textbox")
    expect(input.value).toBe("")
    expect(screen.getAllByRole("listitem")).toHaveLength(20)

    fireEvent.change(input, { target: { value: "bulbasaur" } })
    expect(screen.getByRole("listitem")).toHaveTextContent("bulbasaur")

    fireEvent.change(input, { target: { value: "0002" } })
    expect(screen.getByRole("listitem")).toHaveTextContent("ivysaur")
  })
  it("pads pokemon number correctly", async () => {
    server.use(
      http.get(`${BASE_URL}/pokemon-species`, () => {
        return HttpResponse.json({
          ...pokemonSpecies,
          results: [
            {
              name: "one",
              url: "https://pokeapi.co/api/v2/pokemon-species/1/",
            },
            {
              name: "ten",
              url: "https://pokeapi.co/api/v2/pokemon-species/10/",
            },
            {
              name: "hundred",
              url: "https://pokeapi.co/api/v2/pokemon-species/100/",
            },
            {
              name: "thousand",
              url: "https://pokeapi.co/api/v2/pokemon-species/1000/",
            },
          ],
        })
      }),
    )

    renderWithProviders(<Search />)

    const results = await screen.findAllByRole("listitem")
    expect(results[0]).toHaveTextContent("0001 one")
    expect(results[1]).toHaveTextContent("0010 ten")
    expect(results[2]).toHaveTextContent("0100 hundred")
    expect(results[3]).toHaveTextContent("1000 thousand")
  })
})
