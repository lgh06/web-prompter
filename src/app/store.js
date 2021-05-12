import { configureStore } from '@reduxjs/toolkit'
import aSlice from '../reducers/aSlice'

// https://redux-toolkit.js.org/usage/usage-guide
export default configureStore({
  reducer: {
    aSlice
  },
})