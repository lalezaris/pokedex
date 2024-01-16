import React from "react"
import { renderWithProviders } from "../../utils/testUtils"
import Info from "./Info"
import { screen } from "@testing-library/dom"
import { server } from "../../mocks/node"
import { HttpResponse, http } from "msw"
import { BASE_URL } from "../../mocks/handlers"

describe("Info", () => {
  it("renders info when api call succeeds", async () => {
    renderWithProviders(<Info />)

    expect(await screen.findByRole("heading")).toHaveTextContent(
      "0001 Bulbasaur",
    )
    expect(screen.getByText("Seed Pokémon")).toBeInTheDocument()

    const types = screen.getAllByRole("listitem")
    expect(types[0]).toHaveTextContent("grass")
    expect(types[1]).toHaveTextContent("poison")

    const tableCells = screen.getAllByRole("cell")
    expect(tableCells[1]).toHaveTextContent("0.7 m")
    expect(tableCells[3]).toHaveTextContent("6.9 kg")

    expect(screen.getByText("A strange seed was planted", { exact: false }))
  })
  it("render loading while api call is fetching", () => {
    renderWithProviders(<Info />)
    expect(screen.getByText("loading")).toBeInTheDocument()
  })
  it("renders error if api returns error", async () => {
    server.use(
      http.get(`${BASE_URL}/pokemon-species/:id`, () => {
        return new HttpResponse(null, {
          status: 500,
          statusText: "something went wrong",
        })
      }),
    )

    renderWithProviders(<Info />)
    expect(await screen.findByText("an error occurred")).toBeInTheDocument()
  })
  it("renders error api returns no data", async () => {
    server.use(
      http.get(`${BASE_URL}/pokemon-species/:id`, () => {
        return HttpResponse.json({})
      }),
    )

    renderWithProviders(<Info />)
    expect(await screen.findByText("an error occurred")).toBeInTheDocument()
  })
})
