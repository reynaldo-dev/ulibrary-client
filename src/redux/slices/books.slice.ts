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
            state.loading = false
            state.books = action.payload || []
        })
    },
})

export const { setBooks } = booksSlice.actions
export default booksSlice.reducer

interface Book {
    author: string
    id_book: number
    id_genre: number
    published: string
    stock: number
    title: string
    uuid: string
    genre: Genre
}

interface Genre {
    id_genre: number
    genre: string
}
