import React from 'react'
import { FaCheck, FaTired } from 'react-icons/fa'
import { useSelector } from 'react-redux'

import { BorrowService } from '../../../app/services/borrow.service'
import { BorrowState } from '../../../app/borrowState'
import { RootState, useAppDispatch } from '../../../redux/store'
import { getBorrows } from '../../../redux/thunks/borrow.thunk'
import { Book } from '../../../redux/slices/books.slice'

interface Props {
    book: Book
    setIsOpen: (isOpen: boolean) => void
}

const borrowService = new BorrowService()

export const CheckoutModal = ({ book, setIsOpen }: Props) => {
    const { user } = useSelector((state: RootState) => state.auth)
    const [toDate, setToDate] = React.useState<string>(
        new Date().toISOString().substring(0, 10),
    )
    const [isError, setIsError] = React.useState<boolean>(false)
    const [isSuccess, setIsSuccess] = React.useState<boolean>(false)

    const dispatch = useAppDispatch()

    const handleInputChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
        setToDate(e.target.value)
    }

    const handleCheckout = () => {
        const borrow = borrowService.createBorrow({
            userId: user?.id,
            bookId: book?.id,
            from_date: new Date().toISOString().substring(0, 10),
            to_date: toDate,
            state: BorrowState.ACTIVE,
        })

        if (!borrow) {
            setIsError(true)
            return
        }
        dispatch(getBorrows({ query: user?.email }))
        setIsSuccess(true)

        setTimeout(() => {
            setIsOpen(false)
        }, 3000)
    }
    return (
        <div className='flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0'>
            <div className='relative inline-block p-4 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl sm:max-w-sm rounded-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:p-6'>
                <div className='flex items-center justify-center mx-auto'>
                    <img
                        className='h-full rounded-lg'
                        src='https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
                        alt=''
                    />
                </div>

                <div className='mt-5 text-center'>
                    <h3 className='text-lg font-semibold text-main'>
                        {book.title}
                    </h3>

                    <p className='mt-2 text-gray-500 dark:text-gray-400'>
                        By {book.author}
                    </p>
                </div>

                <div className='flex flex-col p-2 mt-5 gap-5 justify-center'>
                    <label className='text-inactive' htmlFor='from_date'>
                        When will you return it?
                    </label>

                    <input
                        name='from_date'
                        required
                        type='date'
                        onChange={handleInputChanges}
                        value={toDate}
                        className='border border-inactive focus:outline-none p-1 focus:border-main rounded-md'
                    />
                    <button
                        type='submit'
                        disabled={book?.stock < 1}
                        onClick={handleCheckout}
                        className='px-4 w-full py-2.5 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-main rounded-md  focus:outline-none flex items-center justify-center '
                    >
                        {book?.stock > 0 ? (
                            <>
                                <FaCheck className='mr-2' />
                                Get this book
                            </>
                        ) : (
                            <>
                                <FaTired className='mr-2' />
                                Out of stock
                            </>
                        )}
                    </button>
                    {isError && (
                        <p className='text-red-500 p-1 text-red bg-red/20'>
                            Something went wrong, please retry
                        </p>
                    )}
                </div>
                {isSuccess && (
                    <div
                        className='bg-success/30 border-success text-success border-l-4 p-4'
                        role='alert'
                    >
                        <p className='font-bold'>Success</p>
                        <p>
                            You can check now your history of borrows, you can
                            close this modal
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
