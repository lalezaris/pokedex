import React from "react"
import { screen } from "@testing-library/react"
import Details from "./Details"
import { renderWithProviders } from "../../utils/testUtils"
import { server } from "../../mocks/node"
import { HttpResponse, http } from "msw"
import pokemonDetail from "../../mocks/pokemonDetail.json"
import { BASE_URL } from "../../mocks/handlers"

describe("Details", () => {
  it("renders pokemon name and sprite", async () => {
    renderWithProviders(<Details />)

    expect(await screen.findByText("Bulbasaur")).toBeInTheDocument()
    expect(screen.getByAltText("A sprite of Bulbasaur")).toBeVisible()
  })
  it("hides sprite while fetching", async () => {
    renderWithProviders(<Details />)

    expect(screen.queryByRole("img")).not.toBeInTheDocument()
  })
  it("shows error message if species detail call fails", async () => {
    server.use(
      http.get(`${BASE_URL}/pokemon-species/:id`, () => {
        return new HttpResponse(null, {
          status: 500,
          statusText: "something went wrong",
        })
      }),
    )
    renderWithProviders(<Details />)

    const errorMsg = "an error occurred"
    expect(screen.queryByText(errorMsg)).not.toBeInTheDocument()
    expect(await screen.findByText(errorMsg)).toBeInTheDocument()
  })
  it("shows error if pokemon detail call fails", async () => {
    server.use(
      http.get(`${BASE_URL}/pokemon/:id`, () => {
        return new HttpResponse(null, {
          status: 500,
          statusText: "something went wrong",
        })
      }),
    )
    renderWithProviders(<Details />)

    const errorMsg = "an error occurred"
    expect(screen.queryByText(errorMsg)).not.toBeInTheDocument()
    expect(await screen.findByText(errorMsg)).toBeInTheDocument()
  })
  it("Shows no image found if no sprite url", async () => {
    server.use(
      http.get(`${BASE_URL}/pokemon/:id`, () => {
        return HttpResponse.json({
          ...pokemonDetail,
          sprites: {
            front_default: null,
          },
        })
      }),
    )
    renderWithProviders(<Details />)

    expect(await screen.findByText("Bulbasaur")).toBeInTheDocument()
    expect(screen.getByText("No sprite found.")).toBeInTheDocument()
  })
})
