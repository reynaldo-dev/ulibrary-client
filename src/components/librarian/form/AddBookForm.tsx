import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import * as yup from 'yup'
import { useGenres } from '../../../app/hooks/useGenres'
import { BookService } from '../../../app/services/book.service'
import { useDispatch } from 'react-redux'
import { getBooks } from '../../../redux/thunks/books.thunks'
import { useAppDispatch } from '../../../redux/store'

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
    const dispatch = useAppDispatch()
    const [error, setError] = useState<boolean>(false)
    return (
        <div className='bg-secondary p-2 rounded-md w-full'>
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
                    const book = await bookService.createBook({
                        ...values,
                        id_genre: +values.id_genre,
                        stock: +values.stock,
                    })
                    if (book) {
                        dispatch(getBooks({ query: '' }))
                        error && setError(false)
                    } else {
                        setError(true)
                    }
                    values.title = ''
                    values.author = ''
                    values.published = ''
                    values.id_genre = 1
                    values.stock = 0
                }}
            >
                {({ errors, touched, handleChange, values }) => (
                    <Form className=''>
                        <div className='flex flex-col mt-10'>
                            <Field
                                placeholder='Title'
                                name='title'
                                type='text'
                                onChange={handleChange}
                                className='focus:outline-none rounded-md py-3 px-1'
                            />
                            {errors.title && touched.title ? (
                                <div className='text-error mb-2'>
                                    {errors.title}
                                </div>
                            ) : null}
                        </div>

                        <div className='flex flex-col mt-10  '>
                            <Field
                                placeholder='Author'
                                name='author'
                                type='text'
                                onChange={handleChange}
                                className='focus:outline-none rounded-md py-3 px-1'
                            />
                            {errors.author && touched.author ? (
                                <div className='text-error mb-2'>
                                    {errors.author}
                                </div>
                            ) : null}
                        </div>

                        <div className='flex flex-col mt-10'>
                            <label
                                htmlFor='published'
                                className='text-inactive'
                            >
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

                        <div className='flex flex-col mt-10'>
                            <label htmlFor='Stock' className='text-inactive'>
                                Genre
                            </label>
                            <select
                                required
                                name='id_genre'
                                id=''
                                className='focus:outline-none rounded-md py-3 px-1'
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

                        <div className='flex flex-col mt-10 '>
                            <label htmlFor='Stock' className='text-inactive'>
                                Stock
                            </label>
                            <Field
                                name='stock'
                                type='number'
                                onChange={handleChange}
                                className='focus:outline-none rounded-md py-3 px-1'
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
