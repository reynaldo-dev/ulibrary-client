import React from 'react'
import { FaTimes } from 'react-icons/fa'

interface Props {
    children: React.ReactNode
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
}
export const Modal = ({ children, isOpen, setIsOpen }: Props) => {
    return (
        <div className='bg-black/80 fixed left-0 right-0 bottom-0 top-0 flex justify-center items-center'>
            <div>
                <button
                    className='absolute right-1 top-1 p-4 bg-main rounded-full shadow-lg'
                    onClick={() => setIsOpen(false)}
                >
                    <FaTimes className='text-white' />
                </button>
            </div>
            <div>{children}</div>
        </div>
    )
}
