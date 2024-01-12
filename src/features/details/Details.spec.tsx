import React from "react"
import { fireEvent, screen } from "@testing-library/react"
import Details from "./Details"
import { renderWithProviders } from "../../utils/testUtils"
import { server } from "../../mocks/node"
import { HttpResponse, http } from "msw"
import { BASE_URL } from "../../mocks/handlers"

describe("Details", () => {
  it("", async () => {
    renderWithProviders(<Details />)

    expect(screen.getByText("loading")).toBeInTheDocument()
    expect(await screen.findByText("bulbasaur")).toBeInTheDocument()
  })
})
