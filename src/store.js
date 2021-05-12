import { configureStore } from '@reduxjs/toolkit'
import player from './reducers/playerSlice'

// https://redux-toolkit.js.org/usage/usage-guide
export default configureStore({
  reducer: {
    player,
  },
})