import { api } from '../api/api'

interface PayloadUpdate {
    id: string
    state: string
}

interface PayloadCreate {
    userId: string
    bookId: string
    from_date: string
    to_date: string
    state: string
}
export class BorrowService {
    async getBorrows(query: string = '') {
        try {
            const borrows = await api.get(`/borrows?student=${query}`)
            return borrows?.data?.ok ? borrows?.data?.borrows : null
        } catch (error) {
            return null
        }
    }
    async createBorrow(payload: PayloadCreate) {
        try {
            const created = await api.post(`/borrows`, payload)
            return created?.data?.ok ? true : null
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async updateBorrow(payload: PayloadUpdate) {
        try {
            const updated = await api.put(`/borrows`, payload)
            console.log(updated)
            return updated?.data?.ok ? true : null
        } catch (error) {
            console.log(error)
            return null
        }
    }
}
