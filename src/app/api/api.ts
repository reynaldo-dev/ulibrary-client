import axios from 'axios'

const _baseURL = 'https://ulib-api.onrender.com'

export const api = axios.create({
    baseURL: _baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})
