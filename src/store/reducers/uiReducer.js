import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  showBlackBars: false,
}

export const ui = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleBlackBars: (state) => {
      state.showBlackBars = !state.showBlackBars
    },
  },
})

export const { toggleBlackBars } = ui.actions

export default ui.reducer
