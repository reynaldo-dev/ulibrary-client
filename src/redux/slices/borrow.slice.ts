import { createSlice } from '@reduxjs/toolkit'
import { Book } from './books.slice'
import { User } from './auth.slice'
import { getBorrows } from '../thunks/borrow.thunk'

export interface Borrow {
    id: string
    userId: string
    bookId: string
    from_date: string
    to_date: string
    state: string
    book: Book
    users: User
}

interface BorrowState {
    borrows: Borrow[]
    isLoadng: boolean
}

const initialState: BorrowState = {
    borrows: [],
    isLoadng: true,
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
            state.isLoadng = false
        })
        builder.addCase(getBorrows.pending, (state) => {
            state.isLoadng = true
        })
    },
})

export default borrowSlice.reducer
