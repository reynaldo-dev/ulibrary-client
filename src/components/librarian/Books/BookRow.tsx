import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { Roles } from '../../../app/roles'

interface Props {
    book: any
}
export const BookRow = ({ book }: Props) => {
    const { user } = useSelector((state: RootState) => state.auth)
    return (
        <div className='w-full max-w-sm px-4 py-3 bg-white rounded-md shadow-md dark:bg-gray-800'>
            <span className='font-semibold text-main'>ID {book.id_book}</span>
            <div className='flex items-center justify-between'>
                <span className='text-semibold font-light text-main'>
                    {book.title}
                </span>
                <span className='px-3 py-1 text-xs text-main uppercase bg-main/10 rounded-full '>
                    {book?.genre.genre}
                </span>
            </div>

            <div className='mt-10 flex flex-col gap-2'>
                <span className='text-main font-light p-2 bg-main/10 w-fit rounded-full'>
                    By {book?.author}
                </span>
                <span className='text-main font-light p-2 bg-main/10 w-fit rounded-full'>
                    {book.published.substring(0, 10)}
                </span>
                {user?.role.role === Roles.LIBRARIAN && (
                    <span className='text-main font-light p-2 bg-main/10 w-fit rounded-full'>
                        copies: {book.stock}
                    </span>
                )}
            </div>
        </div>
    )
}
