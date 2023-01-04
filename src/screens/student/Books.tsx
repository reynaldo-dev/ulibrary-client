import React, { useEffect } from 'react'
import { FilterBooks } from '../../components/app/FilterBooks'
import { RootState, useAppDispatch } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { getBooks } from '../../redux/thunks/books.thunks'
import { BookCard } from '../../components/student/book/BookCard'
import { getBorrows } from '../../redux/thunks/borrow.thunk'

export const Books = () => {
    const { books } = useSelector((state: RootState) => state.books)
    const { user } = useSelector((state: RootState) => state.auth)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getBooks({ query: '' }))
        dispatch(getBorrows({ query: user?.email }))
    }, [])

    return (
        <div>
            <div className='mt-10 flex w-full'>
                <FilterBooks />
            </div>
            <div className='mx-10 mt-20  flex flex-wrap justify-center gap-6 '>
                {books?.map((book) => (
                    <BookCard key={book.id_book} book={book} />
                ))}
            </div>
        </div>
    )
}
