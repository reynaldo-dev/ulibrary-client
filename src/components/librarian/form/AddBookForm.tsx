import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import * as yup from 'yup'

import { useGenres } from '../../../app/hooks/useGenres'
import { BookService } from '../../../app/services/book.service'
import { getBooks } from '../../../redux/thunks/books.thunks'
import { useAppDispatch } from '../../../redux/store'
import { IForm } from '../../../interfaces/form.interface'
import { TextInput } from '../../app/TextInput'

const addBookSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    author: yup.string().required('Author is required'),
    published: yup.string().required('Published is required'),
    genreId: yup.string().required('Genre is required'),
    stock: yup.number().required('Stock is required'),
})

const form: IForm[] = [
    {
        placeholder: 'Title',
        name: 'title',
        type: 'text',
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {},
        className: 'input input-bordered input-primary w-full',
        value: '',
    },
    {
        placeholder: 'Author',
        name: 'author',
        type: 'text',
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {},
        className: 'input input-bordered input-primary w-full',
        value: '',
    },
    {
        placeholder: 'Date of publication',
        name: 'published',
        type: 'date',
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {},
        className: 'input input-bordered input-primary w-full',
        value: '',
    },
    {
        placeholder: 'Stock',
        name: 'stock',
        type: 'number',
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {},
        className: 'input input-bordered input-primary w-full',
        value: 0,
    },
]

export const AddBookForm = ({
    setIsOpen,
}: {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const bookService = new BookService()
    const genres = useGenres()
    const dispatch = useAppDispatch()
    const [error, setError] = useState<boolean>(false)

    return (
        <div className='bg-white p-4 rounded-md w-full'>
            <Formik
                initialValues={{
                    title: '',
                    author: '',
                    published: '',
                    genreId: '',
                    stock: 0,
                }}
                validationSchema={addBookSchema}
                onSubmit={async (values, { resetForm }) => {
                    const book = await bookService.createBook(values)
                    if (book) {
                        dispatch(getBooks({ query: '' }))
                        error && setError(false)
                        setIsOpen(false)
                    } else {
                        setError(true)
                    }
                    resetForm()
                }}
            >
                {({ errors, touched, handleChange, values }) => (
                    <Form>
                        {form.map((input) => (
                            <div
                                className='flex flex-col mt-10'
                                key={input.name}
                            >
                                <label
                                    htmlFor={input.name}
                                    className='text-inactive'
                                >
                                    {input.name}
                                </label>
                                <TextInput
                                    placeholder={input.placeholder}
                                    name={input.name}
                                    type={input.type}
                                    onChange={handleChange}
                                    className='focus:outline-none input input-bordered input-primary'
                                    value={values[input.name]}
                                />
                                {errors[input.name] && touched[input.name] ? (
                                    <div className='text-error mb-2'>
                                        {errors[input.name]}
                                    </div>
                                ) : null}
                            </div>
                        ))}

                        <div className='flex flex-col mt-10'>
                            <label htmlFor='Stock' className='text-inactive'>
                                Genre
                            </label>
                            <select
                                required
                                name='genreId'
                                id=''
                                className='focus:outline-none select select-primary w-full '
                                onChange={handleChange}
                                value={values.genreId}
                            >
                                {genres.map((genre) => (
                                    <option value={genre?.id} key={genre?.id}>
                                        {genre?.genre}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            type='submit'
                            className='btn btn-primary w-full mt-10'
                        >
                            Add Book
                        </button>
                    </Form>
                )}
            </Formik>
            {error && (
                <div className='alert alert-error shadow-lg fixed bottom-0 left-0 right-0   '>
                    <div>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='stroke-current flex-shrink-0 h-6 w-6'
                            fill='none'
                            viewBox='0 0 24 24'
                        >
                            <path
                                stroke-linecap='round'
                                stroke-linejoin='round'
                                stroke-width='2'
                                d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
                            />
                        </svg>
                        <span>
                            Error creating this book or it already exists
                        </span>
                    </div>
                </div>
            )}
        </div>
    )
}
