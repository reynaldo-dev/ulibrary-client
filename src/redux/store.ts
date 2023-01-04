import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/auth.slice'
import bookReducer from './slices/books.slice'
import userReducer from './slices/user.slice'
import borrowReducer from './slices/borrow.slice'
import { useDispatch } from 'react-redux'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        books: bookReducer,
        user: userReducer,
        borrow: borrowReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
