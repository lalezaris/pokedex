import React from "react"
import { screen } from "@testing-library/react"
import Search from "./Search"
import { renderWithProviders } from "../../utils/testUtils"
import { server } from "../../mocks/node"
import { HttpResponse, http } from "msw"
import { BASE_URL } from "../../mocks/handlers"

describe("Search", () => {
  it("displays loading while fetching data, then displays pokemon name on success", async () => {
    renderWithProviders(<Search />)

    expect(screen.getByText("loading")).toBeInTheDocument()
    expect(await screen.findByText("bulbasaur")).toBeInTheDocument()
  }),
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
})
