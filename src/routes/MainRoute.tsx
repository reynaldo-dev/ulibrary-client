import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { RootState } from '../redux/store'
import { Paths } from '../app/paths'
import { getBooks } from '../redux/thunks/books.thunks'

interface Props {
    children: React.ReactNode
}
export const MainRoute = ({ children }: Props) => {
    const { user } = useSelector((state: RootState) => state.auth)

    return !user ? <Navigate to={Paths.AUTH} /> : <>{children}</>
}
