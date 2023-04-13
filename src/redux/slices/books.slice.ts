import { createSlice } from '@reduxjs/toolkit'
import { getBooks } from '../thunks/books.thunks'

interface State {
    books: Book[] | null
    loading: boolean
}

const initialState: State = {
    books: null,
    loading: true,
}

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        setBooks: (state, action) => {
            state.books = action.payload?.books
            state.loading = false
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getBooks.fulfilled, (state, action) => {
            state.books = action.payload || []
            state.loading = false
        })

        builder.addCase(getBooks.pending, (state) => {
            state.loading = true
        })
    },
})

export const { setBooks } = booksSlice.actions
export default booksSlice.reducer

export interface Book {
    author: string
    id: string
    genreId: string
    published: string
    stock: number
    title: string
    genre: Genre
}

interface Genre {
    id: string
    genre: string
}
