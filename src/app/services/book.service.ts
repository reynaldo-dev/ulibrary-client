import { api } from '../api/api'
interface Payload {
    title: string
    author: string
    published: string
    id_genre: number
    stock: number
}
export class BookService {
    async getBooks(query: string = '') {
        try {
            const books = await api.get(`/books?query=${query}`, {
                headers: {
                    Authorization:
                        `Bearer ${localStorage.getItem('token')}` || '',
                },
            })
            return books?.data.ok ? books.data.books : null
        } catch (error) {
            return null
        }
    }
    async createBook(payload: Payload) {
        try {
            const book = await api.post(
                '/books',
                {
                    ...payload,
                    id_genre: Number(payload.id_genre),
                },
                {
                    headers: {
                        Authorization:
                            `Bearer ${localStorage.getItem('token')}` || '',
                    },
                },
            )
            return book?.data.ok ? book.data.book : null
        } catch (error) {
            return null
        }
    }
}
