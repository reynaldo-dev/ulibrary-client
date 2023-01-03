import React, { useEffect, useState } from 'react'
import { FilterUsers } from '../../components/librarian/users/FilterUsers'
import { UserRow } from '../../components/librarian/users/UserRow'
import { FaPlus } from 'react-icons/fa'
import { Modal } from '../../components/librarian/Books/modal/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../../redux/thunks/user.thunk'
import { RootState } from '../../redux/store'
import { AddUserForm } from '../../components/librarian/users/AddUserForm'

export const Users = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const { users } = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsers({ first_name: '' }))
    }, [])

    return (
        <div>
            <div className='mt-10 flex w-full'>
                <FilterUsers />
            </div>

            <div className='mx-10 mt-10 grid grid-cols-1 md:grid-cols-3 gap-3'>
                {users &&
                    users.map((user) => (
                        <UserRow key={user?.id_user} user={user} />
                    ))}
            </div>

            <button
                className='fixed bottom-10 right-10 p-5 bg-main rounded-full shadow-lg'
                onClick={() => setIsOpen(true)}
            >
                <FaPlus className='text-white' />
            </button>

            {isOpen && (
                <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
                    <AddUserForm />
                </Modal>
            )}
        </div>
    )
}
