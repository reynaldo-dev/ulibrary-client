import { createAsyncThunk } from '@reduxjs/toolkit'
import { BookService } from '../../app/services/book.service'

interface Query {
    query: string
}
const bookService = new BookService()
export const getBooks = createAsyncThunk(
    'books/getBooks',
    async (query: Query) => {
        try {
            const books = await bookService.getBooks(query.query)
            return books
        } catch (error) {
            return null
        }
    },
)
