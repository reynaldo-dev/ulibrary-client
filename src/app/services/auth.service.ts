import { api } from '../api/api'

interface ILoginPayload {
    email: string
    first_name: string
    last_name: string
}

export class AuthService {
    async login(payload: ILoginPayload) {
        try {
            const { data } = await api.post('/auth/login', payload)
            if (data?.ok) {
                localStorage.setItem('token', data?.login.token)
                return data.login
            }
            return null
        } catch (error) {
            return null
        }
    }
    async register() {}

    async whoami() {
        try {
            const { data } = await api.get('/auth/whoami')
            return data?.ok ? data : null
        } catch (error) {
            return null
        }
    }
}
