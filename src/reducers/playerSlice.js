import { createSlice } from '@reduxjs/toolkit'

// one file mapping to one logic feature, basically.
// https://redux-toolkit.js.org/usage/usage-guide
export const playerSlice = createSlice({
  name: 'player',
  initialState: {
    speed: 0,
  },
  reducers: {
    speedPlus: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.speed += 5;
    },
    speedMinus: (state) => {
      state.speed -= 5;
    },
    speedSet: (state, action) => {
      state.speed = action.payload? (+action.payload) : state.speed;
    },
  },
})

// Action creators are generated for each case reducer function
export const { speedPlus, speedMinus, speedSet } = playerSlice.actions

export default playerSlice.reducer