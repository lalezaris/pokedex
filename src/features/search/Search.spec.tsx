import React from "react"
import { fireEvent, screen } from "@testing-library/react"
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
    expect(await screen.findByText("bulbasaur")).toBeInTheDocument()

    const input = screen.getByRole<HTMLInputElement>("textbox")
    expect(input.value).toBe("")
    expect(screen.getAllByRole("listitem")).toHaveLength(20)

    fireEvent.change(input, { target: { value: "bulbasaur" } })
    const item = screen.getByRole("listitem")
    expect(item).toHaveTextContent("bulbasaur")
  })
})
