import React, { useState } from 'react'
import { FilterBooks } from '../../components/app/FilterBooks'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { BookRow } from '../../components/librarian/Books/BookRow'
import { FaPlus } from 'react-icons/fa'
import { Modal } from '../../components/librarian/Books/modal/Modal'
import { AddBookForm } from '../../components/librarian/form/AddBookForm'

export const Books = () => {
    const { books, loading } = useSelector((state: RootState) => state.books)
    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <div>
            <div className='mt-10 flex w-full'>
                <FilterBooks />
            </div>
            <div className='mx-10 mt-10 grid grid-cols-1 md:grid-cols-3 gap-3'>
                {books?.map((book) => (
                    <BookRow key={book.id_book} book={book} />
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
                    <AddBookForm />
                </Modal>
            )}
        </div>
    )
}
