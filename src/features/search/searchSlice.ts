import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { SpeciesResponse } from "../api/apiSlice"

export interface SearchState {
  id: number
  history: SpeciesResponse[]
}

const initialState: SearchState = {
  id: 1,
  history: [],
}

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<number>) => {
      state.id = action.payload
    },
    pushToHistory: (state, action: PayloadAction<SpeciesResponse>) => {
      // Since the maximum size of the history array is 1025, skip checking
      // if the id already exists and just run filter every time
      state.history = state.history
        .reverse()
        .filter((species) => species.number !== action.payload.number)
        .concat(action.payload)
        .reverse()
    },
  },
})

export const { setId, pushToHistory } = searchSlice.actions

export const selectId = (state: RootState) => state.search.id
export const selectHistory = (state: RootState) => state.search.history

export default searchSlice.reducer
