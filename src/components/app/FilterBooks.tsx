import React from 'react'
import { useFormik } from 'formik'
import { FaSearch } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { getBooks } from '../../redux/thunks/books.thunks'

export const FilterBooks = () => {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            query: '',
        },
        onSubmit: async (values) => {
            dispatch(getBooks(values))
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
                    name='query'
                    onChange={formik.handleChange}
                    value={formik.values.query}
                    placeholder='Search books by title, author, genre...'
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
