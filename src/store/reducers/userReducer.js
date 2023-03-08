import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  value: 0,
  hasExperienceStarted: false,
  scene: 1,
  noLerp: false,
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
  },
})

export const { increase, startExperience, changeScene, changeNoLerp } = userSlice.actions

export default userSlice.reducer
