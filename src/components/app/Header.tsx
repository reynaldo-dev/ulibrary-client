import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBars, FaSignOutAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'

export interface Link {
    to: string
    label: string
    icon: () => JSX.Element
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
        <header className='bg-main shadow-md p-4 flex justify-end items-center '>
            <div className='flex-1'>
                <Link to='/' className=' normal-case text-xl text-white'>
                    ULibrary
                </Link>
            </div>
            <nav>
                <motion.ul
                    className='bg-main absolute z-10 top-0 left-0 bottom-0 w-1/2 md:w-1/5 p-3 flex justify-center items-center flex-col'
                    variants={variants}
                    animate={isOpen ? 'open' : 'closed'}
                    transition={{ duration: 0.5, bounce: false }}
                >
                    {links.map((link) => (
                        <li
                            key={link.to}
                            className='w-full flex justify-around items-center gap-2 text-justify text-white mt-2 p-2
                        rounded-md  hover:cursor-pointer
                        transition-all ease-in-out duration-400
                        hover:bg-white hover:text-main'
                        >
                            <Link
                                onClick={() => setIsOpen(false)}
                                key={link.label}
                                to={link.to}
                                className='w-full'
                            >
                                {link.label}
                            </Link>
                            {link.icon()}
                        </li>
                    ))}

                    <button
                        className='bg-main w-[90%] flex justify-center items-center gap-5 p-2 rounded-md text-white
                                    absolute bottom-10 mx-5
                                hover:cursor-pointer transition-all ease-in-out
                                duration-400 hover:bg-white hover:text-primary'
                        onClick={logout}
                    >
                        Logout
                        <FaSignOutAlt />
                    </button>
                </motion.ul>
            </nav>

            <div>
                <button
                    className=''
                    onClick={() => {
                        setIsOpen(!isOpen)
                    }}
                >
                    <FaBars className='text-white relative right-0' />
                </button>
            </div>
        </header>
    )
}
