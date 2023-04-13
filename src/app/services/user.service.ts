import { User } from '../../redux/slices/auth.slice'
import { api } from '../api/api'

interface PostUser {
    email: string
    first_name: string
    last_name: string
    roleId: string
}
export class UserService {
    async getUsers(first_name: string) {
        try {
            const users = await api.get(`/users?first_name=${first_name}`)
            return users?.data?.ok ? users.data.users : null
        } catch (error) {
            return null
        }
    }

    async createUser(payload: PostUser) {
        try {
            const response = await api.post('/users', payload)
            return response?.data?.ok ? response.data.user : null
        } catch (error) {
            console.log(error)
            return null
        }
    }
}
