import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { RootState, useAppDispatch } from '../../redux/store'
import { getBorrows } from '../../redux/thunks/borrow.thunk'
import { BorrowCard } from '../../components/app/BorrowCard'
import { Borrow } from '../../redux/slices/borrow.slice'

export const History = () => {
    const dispatch = useAppDispatch()
    const { borrows } = useSelector((state: RootState) => state.borrow)
    const { user } = useSelector((state: RootState) => state.auth)

    useEffect(() => {
        dispatch(getBorrows({ query: user?.first_name }))
    }, [])
    return (
        <div>
            <div className='mx-10 mt-20 flex flex-wrap justify-center gap-6 '>
                {borrows?.map((borrow: Borrow) => (
                    <BorrowCard key={borrow?.id} borrow={borrow} />
                ))}
            </div>
        </div>
    )
}

export default History
