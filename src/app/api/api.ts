import axios from 'axios'

const _baseURL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export const api = axios.create({
    baseURL: _baseURL,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}` || '',
    },
})
