import React from 'react'
import { FaTimes } from 'react-icons/fa'

interface Props {
    children: React.ReactNode
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export const Modal = ({ children, isOpen, setIsOpen }: Props) => {
    const handleClose = () => {
        setIsOpen(false)
    }
    return (
        <div className='bg-black/80 fixed left-0 right-0 bottom-0 top-0 flex justify-center items-center'>
            <div>
                <button
                    className='absolute right-1 top-1 p-3 md:p-4 bg-main rounded-full shadow-lg'
                    onClick={handleClose}
                >
                    <FaTimes className='text-white' />
                </button>
            </div>
            <div className='w-[90%] md:w-[50%] lg:w-[30%]  flex justify-center '>
                {children}
            </div>
        </div>
    )
}
