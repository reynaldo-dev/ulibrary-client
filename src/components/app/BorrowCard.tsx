import { useState } from 'react'

import { Borrow } from '../../redux/slices/borrow.slice'
import { FaUser, FaBook, FaCalendar } from 'react-icons/fa'
import { Modal } from '../librarian/Books/modal/Modal'
import { BorrowInfo } from '../librarian/borrows/BorrowInfo'

interface BorrowCardProps {
    borrow: Borrow
}
export const BorrowCard = ({ borrow }: BorrowCardProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    return (
        <div className='w-full max-w-sm px-4 py-3 bg-white rounded-md shadow-md dark:bg-gray-800'>
            <div className='flex items-center justify-between'>
                <span className='font-semibold text-main flex gap-1 '>
                    <FaUser className='text-main' />
                    {borrow?.users?.first_name} {borrow?.users?.last_name}
                </span>

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
            <div className='flex justify-between items-center '>
                <button
                    className='bg-main p-2 rounded-md  text-white mt-5'
                    onClick={() => setIsOpen(true)}
                >
                    See More
                </button>
                <span className='text-xs text-primary p-2 bg-main/10'>
                    Ticket: {borrow.id}
                </span>
            </div>

            {isOpen && (
                <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
                    <BorrowInfo borrow={borrow} setIsOpen={setIsOpen} />
                </Modal>
            )}
        </div>
    )
}
