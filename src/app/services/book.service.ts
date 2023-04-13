import { api } from '../api/api'
interface Payload {
    title: string
    author: string
    published: string
    genreId: string
    stock: number
}
export class BookService {
    async getBooks(query: string = '') {
        try {
            const books = await api.get(`/books?query=${query}`)
            return books?.data.ok ? books.data.books : null
        } catch (error) {
            return null
        }
    }
    async createBook(payload: Payload) {
        try {
            const book = await api.post('/books', payload)
            return book?.data.ok ? book.data.book : null
        } catch (error) {
            return null
        }
    }
}
