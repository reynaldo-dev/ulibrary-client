import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { FilterBooks } from '../../components/app/FilterBooks'
import { RootState, useAppDispatch } from '../../redux/store'
import { BookRow } from '../../components/librarian/Books/BookRow'
import { FaPlus } from 'react-icons/fa'
import { Modal } from '../../components/librarian/Books/modal/Modal'
import { AddBookForm } from '../../components/librarian/form/AddBookForm'
import { getBooks } from '../../redux/thunks/books.thunks'
import { LoadAnimation } from '../../components/app/Animation'
import loadingAnim from '../../../public/loading.json'

export const Books = () => {
    const { books, loading } = useSelector((state: RootState) => state.books)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getBooks({ query: '' }))
    }, [])

    return (
        <div className=''>
            {loading ? (
                <LoadAnimation animationData={loadingAnim} />
            ) : (
                <>
                    <div className='mt-10 flex w-full'>
                        <FilterBooks />
                    </div>
                    <div className='mx-10 mt-10 flex flex-wrap gap-4 justify-center mb-5'>
                        {books?.map((book) => (
                            <BookRow key={book.id} book={book} />
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
                            <AddBookForm setIsOpen={setIsOpen} />
                        </Modal>
                    )}
                </>
            )}
        </div>
    )
}
