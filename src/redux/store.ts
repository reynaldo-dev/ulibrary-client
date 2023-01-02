import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/auth.slice'
import bookSlice from './slices/books.slice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        books: bookSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
