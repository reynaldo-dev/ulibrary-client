import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { LoginComponent } from '../../components/Login/Login'

export const Auth = () => {
    const { user } = useSelector((state: RootState) => state.auth)
    return (
        <div className='w-full h-screen flex justify-center items-center bg-main'>
            <LoginComponent />
        </div>
    )
}
