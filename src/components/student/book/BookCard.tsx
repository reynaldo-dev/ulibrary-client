import React, { useState, useEffect } from 'react'
import { Modal } from '../../librarian/Books/modal/Modal'
import { CheckoutModal } from '../modal/CheckoutModal'

export interface BookCardProps {
    book: any
}
export const BookCard = ({ book }: BookCardProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <div className='w-full max-w-sm px-4 py-3 bg-white rounded-md shadow-md dark:bg-gray-800'>
            <div className='flex items-center justify-between'>
                <span className='font-semibold text-main'>{book.title}</span>
                <span className='px-3 py-1 text-xs text-main uppercase bg-main/10 rounded-full '>
                    {book?.genre.genre}
                </span>
            </div>

            <div className='mt-10 flex flex-col'>
                <span>By {book?.author}</span>
                <span>{book.published.substring(0, 10)}</span>
            </div>
            <button
                className='bg-main p-1 rounded-md  text-white mt-5'
                onClick={() => setIsOpen(true)}
            >
                Get Book
            </button>
            {isOpen && (
                <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
                    <CheckoutModal book={book} setIsOpen={setIsOpen} />
                </Modal>
            )}
        </div>
    )
}
