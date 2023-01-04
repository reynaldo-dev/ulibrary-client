import { createSlice } from '@reduxjs/toolkit'
import { Book } from './books.slice'
import { User } from './auth.slice'
import { getBorrows } from '../thunks/borrow.thunk'

export interface Borrow {
    id_borrow: number
    id_user: number
    id_book: number
    from_date: string
    to_date: string
    state: string
    book: Book
    users: User
}

interface BorrowState {
    borrows: Borrow[]
}

const initialState: BorrowState = {
    borrows: [],
}

export const borrowSlice = createSlice({
    name: 'borrow',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getBorrows.fulfilled, (state, action) => {
            action?.payload
                ? (state.borrows = action.payload)
                : (state.borrows = [])
        })
    },
})

export default borrowSlice.reducer
