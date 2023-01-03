import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { Navigate, Outlet } from 'react-router-dom'
import { Paths } from '../app/paths'

export const PublicRoute = () => {
    const { user } = useSelector((state: RootState) => state.auth)
    if (user) {
        return <Navigate to={Paths.HOME} />
    }

    return <Outlet />
}
