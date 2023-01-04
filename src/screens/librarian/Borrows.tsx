import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBorrows } from '../../redux/thunks/borrow.thunk'
import { FilterBorrow } from '../../components/librarian/borrows/FilterBorrow'
import { RootState } from '../../redux/store'
import { Borrow } from '../../redux/slices/borrow.slice'
import { BorrowCard } from '../../components/librarian/borrows/BorrowCard'

export const Borrows = () => {
    const dispatch = useDispatch()
    const { borrows } = useSelector((state: RootState) => state.borrow)

    useEffect(() => {
        dispatch(getBorrows({ query: '' }))
    }, [])

    return (
        <div>
            <div className='mt-10 flex w-full'>
                <FilterBorrow />
            </div>
            <div className='mx-10 mt-20 flex flex-wrap justify-center gap-6 '>
                {borrows?.map((borrow: Borrow) => (
                    <BorrowCard key={borrow?.id_borrow} borrow={borrow} />
                ))}
            </div>
        </div>
    )
}
