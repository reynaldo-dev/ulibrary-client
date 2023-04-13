import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { getBorrows } from '../../redux/thunks/borrow.thunk'
import { FilterBorrow } from '../../components/librarian/borrows/FilterBorrow'
import { RootState, useAppDispatch } from '../../redux/store'
import { Borrow } from '../../redux/slices/borrow.slice'
import { BorrowCard } from '../../components/librarian/borrows/BorrowCard'
import { LoadAnimation } from '../../components/app/Animation'
import loadingAnim from '../../../public/loading.json'

export const Borrows = () => {
    const dispatch = useAppDispatch()
    const { borrows, isLoadng } = useSelector(
        (state: RootState) => state.borrow,
    )

    useEffect(() => {
        dispatch(getBorrows({ query: '' }))
    }, [])

    return (
        <div>
            <div className='mt-10 flex w-full'>
                <FilterBorrow />
            </div>

            {isLoadng ? (
                <LoadAnimation animationData={loadingAnim} />
            ) : (
                <div className='mx-10 mt-20 flex flex-wrap justify-center gap-6 '>
                    {borrows?.map((borrow: Borrow) => (
                        <BorrowCard key={borrow?.id} borrow={borrow} />
                    ))}
                </div>
            )}
        </div>
    )
}
