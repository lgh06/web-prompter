import { configureStore } from '@reduxjs/toolkit'
import aSlice from '../features/aSlice'

// https://redux-toolkit.js.org/usage/usage-guide
export default configureStore({
  reducer: {
    aSlice
  },
})