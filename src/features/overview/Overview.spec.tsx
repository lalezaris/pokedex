import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import Details from "./Details"
import { renderWithProviders } from "../../utils/testUtils"
import { server } from "../../mocks/node"
import { HttpResponse, http } from "msw"
import pokemonSpeciesDetail from "../../mocks/pokemonSpeciesDetail.json"
import { BASE_URL } from "../../mocks/handlers"
import Overview from "./Overview"

describe("Overview", () => {
  describe("Tabs", () => {
    it("displays search and history tabs, with search selected by default", () => {
      renderWithProviders(<Overview />)

      const tabs = screen.getAllByRole("tab")
      expect(tabs).toHaveLength(2)
      expect(tabs[0]).toHaveTextContent("Search")
      expect(
        screen.getByRole("tab", {
          selected: true,
        }),
      ).toHaveTextContent("Search")
      expect(tabs[1]).toHaveTextContent("History")
      expect(
        screen.getByRole("tabpanel", {
          name: "Search",
        }),
      ).toBeVisible()
    })
    it("switches tab panels when tab is click", () => {
      renderWithProviders(<Overview />)

      expect(
        screen.getByRole("tabpanel", {
          name: "Search",
        }),
      ).toBeInTheDocument()
      expect(
        screen.queryByRole("tabpanel", {
          name: "History",
        }),
      ).not.toBeInTheDocument()

      fireEvent.click(
        screen.getByRole("tab", {
          name: "History",
        }),
      )

      expect(
        screen.getByRole("tabpanel", {
          name: "History",
        }),
      ).toBeInTheDocument()

      expect(
        screen.queryByRole("tabpanel", {
          name: "Search",
        }),
      ).not.toBeInTheDocument()
    })
  })

  describe("Search", () => {
    it("update details if pokemon is clicked in search tab", async () => {
      server.use(
        http.get(`${BASE_URL}/pokemon-species/2`, () => {
          return HttpResponse.json({
            ...pokemonSpeciesDetail,
            names: [
              {
                language: {
                  name: "en",
                  url: "https://pokeapi.co/api/v2/language/9/",
                },
                name: "Ivysaur",
              },
            ],
          })
        }),
        http.get(`${BASE_URL}/pokemon-species/:id`, () => {
          return HttpResponse.json(pokemonSpeciesDetail)
        }),
      )
      renderWithProviders(<Overview />)

      await screen.findAllByRole("listitem")

      expect(await screen.findByRole("heading", { name: "Bulbasaur" }))

      fireEvent.click(screen.getByRole("button", { name: "0002 ivysaur" }))

      expect(await screen.findByRole("heading", { name: "Ivysaur" }))
    })
  })

  describe("History", () => {
    it("adds pokemon to history when clicked in search tab", async () => {
      renderWithProviders(<Overview />)

      await screen.findAllByRole("listitem")

      fireEvent.click(screen.getByRole("button", { name: "0002 ivysaur" }))

      fireEvent.click(
        screen.getByRole("tab", {
          name: "History",
        }),
      )

      expect(screen.getByRole("listitem")).toHaveTextContent("0002 ivysaur")
    })
    it("update details if pokemon in history is clicked", async () => {
      server.use(
        http.get(`${BASE_URL}/pokemon-species/2`, () => {
          return HttpResponse.json({
            ...pokemonSpeciesDetail,
            names: [
              {
                language: {
                  name: "en",
                  url: "https://pokeapi.co/api/v2/language/9/",
                },
                name: "Ivysaur",
              },
            ],
          })
        }),
        http.get(`${BASE_URL}/pokemon-species/:id`, () => {
          return HttpResponse.json(pokemonSpeciesDetail)
        }),
      )
      renderWithProviders(<Overview />, {
        preloadedState: {
          search: {
            id: 1,
            history: [
              {
                name: "ivysaur",
                number: 2,
                url: `${BASE_URL}/pokemon-species/2`,
              },
            ],
          },
        },
      })

      fireEvent.click(
        screen.getByRole("tab", {
          name: "History",
        }),
      )

      expect(await screen.findByRole("heading", { name: "Bulbasaur" }))

      fireEvent.click(screen.getByRole("button", { name: "0002 ivysaur" }))

      expect(await screen.findByRole("heading", { name: "Ivysaur" }))
    })
    it("shows the most recently viewed pokemon at the top of the list", async () => {
      renderWithProviders(<Overview />)

      await screen.findAllByRole("listitem")

      fireEvent.click(screen.getByRole("button", { name: "0002 ivysaur" }))
      fireEvent.click(screen.getByRole("button", { name: "0003 venusaur" }))
      fireEvent.click(screen.getByRole("button", { name: "0004 charmander" }))

      fireEvent.click(
        screen.getByRole("tab", {
          name: "History",
        }),
      )

      const items = screen.getAllByRole("listitem")
      expect(items).toHaveLength(3)
      expect(items[0]).toHaveTextContent("0004 charmander")
      expect(items[1]).toHaveTextContent("0003 venusaur")
      expect(items[2]).toHaveTextContent("0002 ivysaur")
    })
    it("reorders list if pokemon already in history is viewed again", async () => {
      renderWithProviders(<Overview />)

      await screen.findAllByRole("listitem")

      fireEvent.click(screen.getByRole("button", { name: "0002 ivysaur" }))
      fireEvent.click(screen.getByRole("button", { name: "0003 venusaur" }))
      fireEvent.click(screen.getByRole("button", { name: "0002 ivysaur" }))

      fireEvent.click(
        screen.getByRole("tab", {
          name: "History",
        }),
      )

      const items = screen.getAllByRole("listitem")
      expect(items).toHaveLength(2)
      expect(items[0]).toHaveTextContent("0002 ivysaur")
      expect(items[1]).toHaveTextContent("0003 venusaur")
    })
  })
})
