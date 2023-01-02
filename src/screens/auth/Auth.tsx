import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { RootState } from '../../redux/store'
import { Paths } from '../../app/paths'
import { LoginComponent } from '../../components/Login/Login'

export const Auth = () => {
    const { user } = useSelector((state: RootState) => state.auth)
    return !user ? (
        <div className='w-full h-screen flex justify-center items-center bg-main'>
            <LoginComponent />
        </div>
    ) : (
        <Navigate to={Paths.HOME} />
    )
}
