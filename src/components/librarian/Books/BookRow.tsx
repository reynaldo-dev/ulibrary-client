import { useSelector } from 'react-redux'

import { RootState } from '../../../redux/store'
import { Roles } from '../../../app/roles'
import { Book } from '../../../redux/slices/books.slice'
import cover from '../../../../public/book-cover.jpg'

interface Props {
    book: Book
}
export const BookRow = ({ book }: Props) => {
    const { user } = useSelector((state: RootState) => state.auth)
    return (
        <div className='card w-96 bg-base-100 shadow-xl h-96'>
            <figure>
                <img src={cover} alt='Shoes' />
            </figure>
            <div className='card-body'>
                <div className='badge badge-primary'>{book.genre.genre}</div>
                <h2 className='card-title'>{book.title}</h2>
                <p>By {book?.author}</p>
                <div className='card-actions justify-end'>
                    <div className='badge badge-outline p-1'>
                        {book.published.substring(0, 10)}
                    </div>
                    {user?.role.role === Roles.LIBRARIAN && (
                        <div className='badge badge-outline'>
                            Copies: {book.stock}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
