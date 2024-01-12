import React from "react"
import { fireEvent, screen } from "@testing-library/react"
import Details from "./Details"
import { renderWithProviders } from "../../utils/testUtils"
import { server } from "../../mocks/node"
import { HttpResponse, http } from "msw"
import { BASE_URL } from "../../mocks/handlers"

describe("Details", () => {
  it("renders pokemon name and sprite", async () => {
    renderWithProviders(<Details />)

    expect(await screen.findByText("Bulbasaur")).toBeInTheDocument()
    expect(screen.getByAltText("A sprite of Bulbasaur")).toBeVisible()
  })
  it.todo("hides sprite while fetching")
  it.todo("shows error message if species detail call fails")
  it.todo("shows error if pokemon detail call fails")
  it.todo("update if selected pokemon is updated")
})
