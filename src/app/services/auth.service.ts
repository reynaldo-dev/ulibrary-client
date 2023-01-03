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
            const { data } = await api.get('/auth/whoami', {
                headers: {
                    Authorization:
                        `Bearer ${localStorage.getItem('token')}` || '',
                },
            })
            return data?.ok ? data : null
        } catch (error) {
            return null
        }
    }
}
