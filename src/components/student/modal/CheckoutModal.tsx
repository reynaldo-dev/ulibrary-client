import React from 'react'

interface Props {
    book: any
}

export const CheckoutModal = ({ book }: Props) => {
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

                <div className='mt-4 sm:flex sm:items-center sm:justify-between sm:mt-6 sm:-mx-2'>
                    <button className='px-4 sm:mx-2 w-full py-2.5 mt-3 sm:mt-0 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-main rounded-md  focus:outline-none '>
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    )
}
