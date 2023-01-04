import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBars, FaSignOutAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'

export interface Link {
    to: string
    label: string
}
interface Props {
    links: Link[]
}
export const Header = ({ links }: Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const logout = () => {
        localStorage.removeItem('token')
        window.location.reload()
    }

    const variants = {
        open: { x: '0%' },
        closed: { x: '-200%' },
    }
    return (
        <div className='bg-main shadow-md p-3 flex justify-end items-center '>
            <motion.div
                className='bg-main absolute top-0 left-0 bottom-0 p-3 flex justify-center items-center flex-col'
                variants={variants}
                animate={isOpen ? 'open' : 'closed'}
                transition={{ duration: 0.5, bounce: false }}
            >
                {links.map((link) => (
                    <Link
                        onClick={() => setIsOpen(false)}
                        key={link.label}
                        to={link.to}
                        className='text-secondary w-full mt-2 p-2
                                     rounded-md text-justify hover:cursor-pointer
                                    transition-all ease-in-out duration-400
                                     hover:bg-secondary hover:text-main'
                    >
                        {link.label}
                    </Link>
                ))}
            </motion.div>

            <div>
                <button
                    className='bg-main p-2 rounded-md text-secondary mr-2
                                hover:cursor-pointer transition-all ease-in-out
                                duration-400 hover:bg-secondary hover:text-main'
                    onClick={logout}
                >
                    <FaSignOutAlt />
                </button>

                <button
                    className=''
                    onClick={() => {
                        setIsOpen(!isOpen)
                    }}
                >
                    <FaBars className='text-secondary relative right-0' />
                </button>
            </div>
        </div>
    )
}
