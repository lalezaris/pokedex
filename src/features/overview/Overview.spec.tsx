import React from "react"
import { screen } from "@testing-library/react"
import Details from "./Details"
import { renderWithProviders } from "../../utils/testUtils"
import { server } from "../../mocks/node"
import { HttpResponse, http } from "msw"
import pokemonDetail from "../../mocks/pokemonDetail.json"
import { BASE_URL } from "../../mocks/handlers"

describe("Overview", () => {
  // This should be more of an integration test
  // Search & details should live in an "overview" component
  it.todo("update details if selected pokemon is updated")
})
