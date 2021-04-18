import { configureStore } from '@reduxjs/toolkit'
import aSlice from '../features/aSlice'

export default configureStore({
  reducer: {
    aSlice
  },
})