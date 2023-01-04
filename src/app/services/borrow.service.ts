import { api } from '../api/api'

interface PayloadUpdate {
    id_borrow: number
    state: string
}

interface PayloadCreate {
    id_user: number
    id_book: number
    from_date: string
    to_date: string
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
    async createBorrow(payload: PayloadCreate) {
        try {
            const created = await api.post(`/borrows`, payload, {
                headers: {
                    Authorization:
                        `Bearer ${localStorage.getItem('token')}` || '',
                },
            })

            return created?.data?.ok ? true : null
        } catch (error) {
            console.log(error)
            return null
        }
    }

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
