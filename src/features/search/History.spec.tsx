import React from "react"
import { renderWithProviders } from "../../utils/testUtils"
import History from "./History"
import { screen } from "@testing-library/react"

describe("History", () => {
  it("Displays no history text if empty", () => {
    renderWithProviders(<History />)

    expect(screen.getByText("no history")).toBeInTheDocument()
  })
  it("Displays list items when items in history", () => {
    renderWithProviders(<History />, {
      preloadedState: {
        search: {
          id: 1,
          history: [
            {
              name: "test1",
              number: 1,
              url: "some url",
            },
            {
              name: "test2",
              number: 212,
              url: "some url",
            },
          ],
        },
      },
    })

    const items = screen.getAllByRole("listitem")
    expect(items).toHaveLength(2)
    expect(items[0]).toHaveTextContent("0001 test1")
    expect(items[1]).toHaveTextContent("0212 test2")
  })
})
