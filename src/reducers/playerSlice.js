import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {dispatch} from 'react-redux'
import NoSleep from 'nosleep.js'
let nosleep = new NoSleep();


const setPlayAndAnimation = createAsyncThunk(
  'player/setPlayAndAnimation',
  async (payload, { dispatch, getState }) => {
    dispatch(setPlay(payload))
    //     dispatch({type:'player/animation'})
    dispatch(animation(payload))
    // return 1;
  }
)

// one file mapping to one logic feature, basically.
// https://redux-toolkit.js.org/usage/usage-guide
export const playerSlice = createSlice({
  name: 'player',
  initialState: {
    speed: 10,
    innerHTML: 'You can paste or input texts here. <br/>你可以把文字粘贴在这里。或用输入法输入。',
    scrollHeight: 600, // whole pre height
    clientHeight: 1080, // one screen height,
    movedHeight: 0,
    playing:0,
    paused: 0,
    viewerCSS: {
      backgroundColor: '#333',
      color: 'white',
      fontSize: '72px',
      fontWeight: 'bold',
      fontFamily: 'Microsoft YaHei',
      lineHeight: '1.4'
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
        state.playing = 1;
        nosleep.enable();
        const $viewer = document.querySelector('.viewer')
        $viewer.requestFullscreen();
        // playerSlice.actions.animation();
      }else if (p === 'exit'){
        state.playing = 0;
        state.paused = 0;
        state.movedHeight = 0;
        nosleep.disable();
        // document.querySelector('.viewer').exitFullscreen()
        document.fullscreenElement && document.exitFullscreen()
      }else if (p === 'prev'){
        let h = state.movedHeight - state.clientHeight/2;
        if (h < 0) {
          h = 0
        }
        state.movedHeight = h;
      }else if (p === 'next'){
        let h = state.movedHeight + state.clientHeight/2;
        if (h < 0) {
          h = 0
        }
        state.movedHeight = h;
      }else if (p === 'pause'){
        state.paused = +(!state.paused);
      }
    },
    setViewerCSS: (state, action) => {
      state.viewerCSS = Object.assign({}, state.viewerCSS, action.payload);
    },
    setState: (state, action) => {
      const {key, value} = action.payload;
      state[key] = value;
    },
    animation: (state, action) => {
      console.log('inside animation')
      if (action.payload === 'start'){
        // setInterval(() => {
        //   state.movedHeight += state.speed;
        //   // document.querySelector('pre.text').style.transform = `translateY(-${movedHeight}px)`
        // }, 1000)
        // document.querySelector('pre.text').style.transform = `translateY(-${state.scrollHeight - state.clientHeight/2}px)`
      }else if (action.payload === 'exit'){
        document.querySelector('pre.text').style.transform = ''
      }
    }
  },
  extraReducers:{
    // [setPlayAsync.fulfilled]: (state, action) => {}
  }
})

// Action creators are generated for each case reducer function
export const { setSpeed, setInnerHTML, setPlay, setViewerCSS, setState, animation } = playerSlice.actions
export {setPlayAndAnimation}

export default playerSlice.reducer