import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit"
import { apiSlice } from "../features/api/apiSlice"
import searchReducer from "../features/search/searchSlice"

const rootReducer = combineReducers({
  search: searchReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
})

export const setupStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
    preloadedState,
  })

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
