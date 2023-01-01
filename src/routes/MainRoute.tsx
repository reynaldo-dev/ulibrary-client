import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { RootState } from '../redux/store'
import { Paths } from '../app/paths'

interface Props {
    children: React.ReactNode
}
export const MainRoute = ({ children }: Props) => {
    const { user } = useSelector((state: RootState) => state.auth)
    if (!user) {
        return <Navigate to={Paths.AUTH} />
    }

    return <>{children}</>
}
