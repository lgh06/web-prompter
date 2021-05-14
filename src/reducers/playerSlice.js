import { createSlice } from '@reduxjs/toolkit'
import NoSleep from 'nosleep.js'
let nosleep = new NoSleep();

// one file mapping to one logic feature, basically.
// https://redux-toolkit.js.org/usage/usage-guide
export const playerSlice = createSlice({
  name: 'player',
  initialState: {
    speed: 0,
    innerHTML: 'You can paste or input texts here. <br/>你可以把文字粘贴在这里。或用输入法输入。',
    play:0,
    viewerCSS: {
      backgroundColor: '#eee',
      fontSize: '72px',
      fontWeight: 'bold',
    }
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
    setInnerHTML: (state, action) => {
      state.innerHTML = action.payload;
      if (action.payload === '') {
        document.querySelector('pre.text').innerHTML = '';
      }
    },
    setPlay: (state, action) =>{
      let p = action.payload;
      if (p === 'start') {
        state.play = 1;
        nosleep.enable();
        document.querySelector('.viewer').requestFullscreen()
      }else if (p === 'quit'){
        state.play = 0;
        nosleep.disable();
        // document.querySelector('.viewer').exitFullscreen()
        document.exitFullscreen()
      }
    },
    setViewerCSS: (state, action) => {
      state.viewerCSS = Object.assign({}, state.viewerCSS, action.payload);
    }
  },
})

// Action creators are generated for each case reducer function
export const { setSpeed, setInnerHTML, setPlay, setViewerCSS } = playerSlice.actions

export default playerSlice.reducer