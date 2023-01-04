import { api } from '../api/api'

interface PayloadUpdate {
    id_borrow: number
    state: string
}
export class BorrowService {
    async getBorrows(query: string = '') {
        try {
            const borrows = await api.get(`/borrows?student=${query}`, {
                headers: {
                    Authorization:
                        `Bearer ${localStorage.getItem('token')}` || '',
                },
            })

            return borrows?.data?.ok ? borrows?.data?.borrows : null
        } catch (error) {
            return null
        }
    }
    async createBorrow() {}

    async updateBorrow(payload: PayloadUpdate) {
        try {
            const updated = await api.put(`/borrows`, payload, {
                headers: {
                    Authorization:
                        `Bearer ${localStorage.getItem('token')}` || '',
                },
            })

            return updated?.data?.ok ? true : null
        } catch (error) {
            console.log(error)
            return null
        }
    }
}
