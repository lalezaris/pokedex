import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

export interface SearchState {
  id: number
}

const initialState: SearchState = {
  id: 1,
}

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<number>) => {
      state.id = action.payload
    },
  },
})

export const { setId } = searchSlice.actions

export const selectId = (state: RootState) => state.search.id

export default searchSlice.reducer
