import { api } from '../api/api'

export class UserService {
    async getUsers(first_name: string) {
        try {
            const users = await api.get(`/users?first_name=${first_name}`, {
                headers: {
                    Authorization:
                        `Bearer ${localStorage.getItem('token')}` || '',
                },
            })
            return users?.data?.ok ? users.data.users : null
        } catch (error) {
            return null
        }
    }

    async getUser(id_user: number) {}

    async createUser(payload: any) {
        try {
            const response = await api.post('/users', payload, {
                headers: {
                    Authorization:
                        `Bearer ${localStorage.getItem('token')}` || '',
                },
            })
            return response?.data?.ok ? response.data.user : null
        } catch (error) {
            return null
        }
    }
}
