import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./reducers/userReducer"
import introductionReducer from "./reducers/introductionReducer"
import uiReducer from "./reducers/uiReducer"

export const store = configureStore({
  reducer: {
    user: userReducer,
    introduction: introductionReducer,
    ui: uiReducer,
  },
})
