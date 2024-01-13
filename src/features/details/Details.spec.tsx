import React from "react"
import { fireEvent, screen } from "@testing-library/react"
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
    renderWithProviders(<Details />)
    server.use(
      http.get(`${BASE_URL}/pokemon-species/:id`, () => {
        return new HttpResponse(null, {
          status: 500,
          statusText: "something went wrong",
        })
      }),
    )

    const errorMsg = "An error occurred"
    expect(screen.queryByText(errorMsg)).not.toBeInTheDocument()
    expect(await screen.findByText(errorMsg)).toBeInTheDocument()
  })
  it("shows error if pokemon detail call fails", async () => {
    renderWithProviders(<Details />)
    server.use(
      http.get(`${BASE_URL}/pokemon/:id`, () => {
        return new HttpResponse(null, {
          status: 500,
          statusText: "something went wrong",
        })
      }),
    )

    const errorMsg = "An error occurred"
    expect(screen.queryByText(errorMsg)).not.toBeInTheDocument()
    expect(await screen.findByText(errorMsg)).toBeInTheDocument()
  })
  // This should be more of an integration test
  // Search & details should live in an "overview" component
  it.todo("update if selected pokemon is updated")
  it("Shows no image found if no sprite url", async () => {
    renderWithProviders(<Details />)

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

    expect(await screen.findByText("Bulbasaur")).toBeInTheDocument()
    expect(screen.getByText("No sprite found.")).toBeInTheDocument()
  })
})
