import { useFormik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import { getBorrows } from '../../../redux/thunks/borrow.thunk'
import { FaSearch } from 'react-icons/fa'
import { useAppDispatch } from '../../../redux/store'

export const FilterBorrow = () => {
    const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues: {
            query: '',
        },
        onSubmit: async (values) => {
            dispatch(getBorrows(values))
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
                    className=' shadow-lg border-inactive bg-white p-4 pr-24 rounded-full text-sm focus:outline-none'
                    type='text'
                    name='query'
                    onChange={formik.handleChange}
                    value={formik.values.query}
                    placeholder='student name or email '
                />
                <button
                    type='submit'
                    className='hover:scale-125 transition-all duration-100 rounded-full bg-main p-3'
                >
                    <FaSearch className=' text-white' />
                </button>
            </form>
        </div>
    )
}
