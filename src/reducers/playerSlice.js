import { createSlice } from '@reduxjs/toolkit'

// one file mapping to one logic feature, basically.
// https://redux-toolkit.js.org/usage/usage-guide
export const playerSlice = createSlice({
  name: 'player',
  initialState: {
    speed: 0,
    innerHTML: 'You can paste or input texts here. <br/>你可以把文字粘贴在这里。或用输入法输入。',
    appendMode: true,
  },
  reducers: {
    setSpeed: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      var startWithPlusOrMinus = String(action.payload).indexOf('+') === 0 || 
        String(action.payload).indexOf('-') === 0;

      if(startWithPlusOrMinus){
        state.speed += (+action.payload);
      } else {
        state.speed = action.payload? (+action.payload) : state.speed;
      }
    },
    deleteInnerHTML: (state, action) => {
      state.innerHTML = '';
    },
    setInnerHTML: (state, action) => {
      state.innerHTML = action.payload;
    },
    setAppendMode: (state, action) => {
      state.appendMode = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setSpeed, deleteInnerHTML, setInnerHTML, setAppendMode } = playerSlice.actions

export default playerSlice.reducer