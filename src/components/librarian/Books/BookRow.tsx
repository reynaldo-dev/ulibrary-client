import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { Roles } from '../../../app/roles'

interface Props {
    book: any
}
export const BookRow = ({ book }: Props) => {
    const { user } = useSelector((state: RootState) => state.auth)
    return (
        <div className='bg-white shadow-md rounded-lg flex p-2 flex-col  '>
            {user?.role.role === Roles.LIBRARIAN && (
                <div className='text-lg text-left md:text-center  font-semibold '>
                    ID: {book.id_book}
                </div>
            )}
            <div className='text-lg text-left md:text-center font-semibold text-main'>
                {book.title}
            </div>
            <div className='text-sm text-left md:text-center  text-inactive font-light'>
                Author: {book.author}
            </div>
            <div className='text-sm  text-left md:text-center text-inactive font-light'>
                Genre: {book.genre.genre}
            </div>
            <div className='text-sm text-left md:text-center  text-inactive font-light'>
                Published: {book.published.substring(0, 10)}
            </div>

            {user?.role.role === Roles.LIBRARIAN && (
                <div className='text-sm text-left md:text-center  text-inactive font-light'>
                    Stock {book.stock}
                </div>
            )}
        </div>
    )
}
