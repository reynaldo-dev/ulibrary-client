import React from 'react'
import { api } from '../api/api'

export const useGenres = () => {
    const [genres, setGenres] = React.useState([])

    const getGenres = async () => {
        const response = await api.get('/genres', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` || '',
            },
        })
        setGenres(response?.data?.ok ? response.data.genres : [])
    }

    React.useEffect(() => {
        getGenres()
    }, [])

    return genres
}
