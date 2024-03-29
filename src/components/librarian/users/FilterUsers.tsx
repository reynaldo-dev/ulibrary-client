import React from 'react'
import { useFormik } from 'formik'
import { FaSearch } from 'react-icons/fa'

import { getUsers } from '../../../redux/thunks/user.thunk'
import { useAppDispatch } from '../../../redux/store'

export const FilterUsers = () => {
    const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues: {
            first_name: '',
        },
        onSubmit: async (values) => {
            dispatch(getUsers(values))
        },
    })

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        formik.handleSubmit(e)
    }
    return (
        <div className='ml-10 '>
            <form
                action=''
                onSubmit={handleSearch}
                className='flex items-center gap-2'
            >
                <input
                    className='border border-main h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none'
                    type='text'
                    name='first_name'
                    onChange={formik.handleChange}
                    value={formik.values.first_name}
                    placeholder='Search by first name...'
                />
                <button
                    type='submit'
                    className='hover:scale-125 transition-all duration-100'
                >
                    <FaSearch className=' text-main' />
                </button>
            </form>
        </div>
    )
}
