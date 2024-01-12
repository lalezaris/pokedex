/// <reference types="vitest/globals" />
import "@testing-library/jest-dom"
import { server } from "./mocks/node.js"

beforeAll(() => {
  server.listen()
})

afterEach(() => {
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})
