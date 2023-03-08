import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  value: 0,
  hasExperienceStarted: false,
  scene: 1,
  noLerp: false,
  noLerpFocus: {
    x: 0,
    y: 0,
  },
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    increase: (state) => {
      state.value += 1
      console.log("increase dispatch : " + state.value)
    },
    startExperience: (state) => {
      state.hasExperienceStarted = true
    },
    changeScene: (state, action) => {
      state.scene = action.payload
    },
    changeNoLerp: (state, action) => {
      state.noLerp = action.payload
    },
    changeNoLerpFocus: (state, action) => {
      state.noLerpFocus = action.payload
    }
  },
})

export const { increase, startExperience, changeScene, changeNoLerp, changeNoLerpFocus } = userSlice.actions

export default userSlice.reducer
