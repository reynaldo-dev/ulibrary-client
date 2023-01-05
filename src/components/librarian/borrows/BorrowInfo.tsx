import React from 'react'
import { Borrow } from '../../../redux/slices/borrow.slice'
import { FaBook, FaCalendar, FaUser } from 'react-icons/fa'
import { BorrowState } from '../../../app/borrowState'
import { BorrowService } from '../../../app/services/borrow.service'
import { useDispatch, useSelector } from 'react-redux'
import { getBorrows } from '../../../redux/thunks/borrow.thunk'
import { RootState, useAppDispatch } from '../../../redux/store'
import { Roles } from '../../../app/roles'
import { FaArrowCircleUp, FaArrowCircleDown } from 'react-icons/fa'

interface BorrowInfoProps {
    borrow: Borrow
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const borrowService = new BorrowService()

export const BorrowInfo = ({ borrow, setIsOpen }: BorrowInfoProps) => {
    const [isErrorState, setIsErrorState] = React.useState<boolean>(false)
    const [isError, setIsError] = React.useState<boolean>(false)
    const { user } = useSelector((state: RootState) => state.auth)
    const dispatch = useAppDispatch()

    const handleConfirm = async () => {
        if (borrow?.state !== BorrowState.TO_RETURN) {
            setIsErrorState(true)
            return
        }
        const isReturned = await borrowService.updateBorrow({
            id_borrow: borrow?.id_borrow,
            state: BorrowState.RETURNED,
        })
        dispatch(getBorrows({ query: '' }))
        !isReturned ? setIsError(true) : setIsOpen(false)
    }

    const handleReturn = async () => {
        if (
            borrow?.state == BorrowState.TO_RETURN ||
            borrow?.state == BorrowState.RETURNED
        ) {
            setIsOpen(false)
            return
        }

        const returned = await borrowService.updateBorrow({
            id_borrow: borrow?.id_borrow,
            state: BorrowState.TO_RETURN,
        })
        dispatch(getBorrows({ query: '' }))
        !returned ? setIsError(true) : setIsOpen(false)
        setIsOpen(false)
    }

    return (
        <div className='w-full max-w-sm px-4 py-5 bg-white rounded-md shadow-md dark:bg-gray-800'>
            <div className='flex items-center justify-between'>
                <div className='flex flex-col items-start'>
                    <span className='font-semibold text-main flex gap-1 '>
                        {borrow?.users?.first_name} {borrow?.users?.last_name}
                    </span>
                    <span className='font-light text-inactive flex gap-1 '>
                        {borrow?.users?.email}
                    </span>
                    <span className='font-light text-inactive flex gap-1 '>
                        ID {borrow?.users?.id_user}
                    </span>
                </div>

                <span className='px-3 py-1 text-xs text-main uppercase bg-main/10 rounded-full '>
                    {borrow?.state}
                </span>
            </div>

            <div className='mt-10 flex flex-col'>
                <div className='flex items-center gap-1'>
                    <FaBook className='text-main' />
                    <span className='text-main'>{borrow?.book.title}</span>
                </div>

                <div className='flex gap-1 mb-1 mt-2'>
                    <FaCalendar className='text-main' />
                    <span className='text-inactive'>
                        {borrow.from_date.substring(0, 10)}
                    </span>
                </div>
            </div>

            {user?.role.role === Roles.LIBRARIAN ? (
                <button
                    className='bg-main p-1 rounded-md flex items-center gap-2  text-white mt-5'
                    onClick={handleConfirm}
                >
                    <FaArrowCircleDown className='text-white' />
                    Confirm Return
                </button>
            ) : (
                <>
                    <button
                        className='bg-main p-1 rounded-md flex items-center gap-2  text-white mt-5'
                        onClick={handleReturn}
                    >
                        <FaArrowCircleUp className='text-white' />
                        Request return
                    </button>
                    {borrow?.state === BorrowState.TO_RETURN && (
                        <div className='bg-inactive/10 p-1 rounded-md mt-10'>
                            <span className='text-inactive'>
                                This borrow is in "To return" state, you can't
                                request this again.
                            </span>
                        </div>
                    )}
                </>
            )}

            {isErrorState && (
                <div className='bg-inactive/10 p-1 rounded-md mt-10'>
                    <span className='text-inactive'>
                        This borrow is active or has been returned. You can't
                        confirm it again.
                    </span>
                </div>
            )}

            {isError && (
                <div className='bg-error/10 p-1 rounded-md mt-10'>
                    <span className='text-error'>
                        An error has occurred. Please try again.
                    </span>
                </div>
            )}
        </div>
    )
}
