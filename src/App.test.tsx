import React from "react"
import App from "./App"
import { renderWithProviders } from "./utils/testUtils"

test("renders header", () => {
  const { getByText } = renderWithProviders(<App />)

  expect(getByText(/Pokedex/i)).toBeInTheDocument()
})
