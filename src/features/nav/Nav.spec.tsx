import React from "react"
import { renderWithProviders } from "../../utils/testUtils"
import Nav from "./Nav"
import { fireEvent, screen } from "@testing-library/dom"

describe("Nav", () => {
  it("renders info link with active class when clicked", async () => {
    renderWithProviders(<Nav />)

    const link = screen.getByRole("link", { name: "Info" })

    fireEvent.click(link)
  })
})
