import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import * as yup from 'yup'
import { useGenres } from '../../../app/hooks/useGenres'
import { BookService } from '../../../app/services/book.service'
import { useDispatch } from 'react-redux'
import { getBooks } from '../../../redux/thunks/books.thunks'

const addBookSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    author: yup.string().required('Author is required'),
    published: yup.string().required('Published is required'),
    id_genre: yup.number().required('Genre is required'),
    stock: yup.number().required('Stock is required'),
})

export const AddBookForm = () => {
    const genres = useGenres()
    const bookService = new BookService()
    const dispatch = useDispatch()
    const [error, setError] = useState<boolean>(false)
    return (
        <div className='bg-secondary p-3 rounded-md'>
            <Formik
                initialValues={{
                    title: '',
                    author: '',
                    published: '',
                    id_genre: 1,
                    stock: 0,
                }}
                validationSchema={addBookSchema}
                onSubmit={async (values) => {
                    const book = await bookService.createBook(values)
                    if (book) {
                        values.title = ''
                        values.author = ''
                        values.published = ''
                        values.id_genre = 1
                        values.stock = 0
                        dispatch(getBooks({ query: '' }))
                    } else {
                        setError(true)
                    }
                }}
            >
                {({ errors, touched, handleChange, values }) => (
                    <Form className=''>
                        <div className='flex flex-col mt-10 w-72'>
                            <label htmlFor='title' className='text-main'>
                                Title
                            </label>
                            <Field
                                name='title'
                                type='text'
                                onChange={handleChange}
                                className='border border-inactive focus:outline-none focus:border-main rounded-md p-2'
                            />
                            {errors.title && touched.title ? (
                                <div className='text-error mb-2'>
                                    {errors.title}
                                </div>
                            ) : null}
                        </div>

                        <div className='flex flex-col mt-10 w-72 '>
                            <label htmlFor='author' className='text-main'>
                                Author
                            </label>
                            <Field
                                name='author'
                                type='text'
                                onChange={handleChange}
                                className='border border-inactive focus:outline-none focus:border-main rounded-md p-2'
                            />
                            {errors.author && touched.author ? (
                                <div className='text-error mb-2'>
                                    {errors.author}
                                </div>
                            ) : null}
                        </div>

                        <div className='flex flex-col mt-10'>
                            <label htmlFor='published' className='text-main'>
                                Published
                            </label>
                            <Field
                                name='published'
                                type='date'
                                onChange={handleChange}
                                className='border border-inactive focus:outline-none focus:border-main rounded-md p-2'
                            />
                            {errors.published && touched.published ? (
                                <div className='text-error mb-2'>
                                    {errors.published}
                                </div>
                            ) : null}
                        </div>

                        <div className='flex flex-col mt-10 w-72'>
                            <label htmlFor='id_genre' className='text-main'>
                                Genre
                            </label>

                            <select
                                required
                                name='id_genre'
                                id=''
                                className='p-2 focus:outline-none rounded-md'
                                onChange={handleChange}
                                value={values.id_genre}
                            >
                                {genres.map((genre) => (
                                    <option
                                        value={genre?.id_genre}
                                        key={genre?.id_genre}
                                    >
                                        {genre?.genre}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className='flex flex-col mt-10 w-72'>
                            <label htmlFor='Stock' className='text-main'>
                                Stock
                            </label>
                            <Field
                                name='stock'
                                type='number'
                                onChange={handleChange}
                                className='border border-inactive focus:outline-none focus:border-main rounded-md p-2'
                            />
                            {errors.stock && touched.stock ? (
                                <div className='text-error mb-2'>
                                    {errors.stock}
                                </div>
                            ) : null}
                        </div>

                        <button
                            type='submit'
                            className='bg-main text-white rounded-md p-2 mt-10 w-full'
                        >
                            Add Book
                        </button>
                    </Form>
                )}
            </Formik>
            {error && (
                <div className='text-error fixed bottom-0 left-0 right-0  bg-error '>
                    <span className='text-secondary text-sm p-2'>
                        Error adding this book, or this book already exists
                    </span>
                </div>
            )}
        </div>
    )
}
