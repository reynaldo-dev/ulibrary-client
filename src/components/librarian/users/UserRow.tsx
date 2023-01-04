import React from 'react'
import { User } from '../../../redux/slices/auth.slice'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { Roles } from '../../../app/roles'

interface Props {
    user: any
}
export const UserRow = ({ user }: Props) => {
    const { user: authUser } = useSelector((state: RootState) => state.auth)
    return (
        <div className='bg-white shadow-md rounded-lg flex p-2 flex-col  '>
            <div className='text-lg text-left md:text-center font-semibold text-main'>
                {user?.first_name} {user?.last_name}{' '}
                {authUser?.email === user?.email && '(Me)'}
            </div>

            <div className='text-sm   text-left md:text-center mt-5 text-inactive font-light'>
                {user?.email}
            </div>
            <div className='text-sm text-left md:text-center  text-inactive font-light'>
                {user?.role.role}
            </div>

            {user.role.role === Roles.STUDENT && (
                <div className='text-sm text-left md:text-center  text-inactive font-light'>
                    Borrows: {user?.borrow?.length}
                </div>
            )}
        </div>
    )
}
