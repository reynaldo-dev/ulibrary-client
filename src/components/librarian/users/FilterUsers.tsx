import { useFormik } from 'formik'
import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { getUsers } from '../../../redux/thunks/user.thunk'

export const FilterUsers = () => {
    const dispatch = useDispatch()
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
