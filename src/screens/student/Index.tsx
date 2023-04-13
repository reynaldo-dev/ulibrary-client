import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header, Link } from '../../components/app/Header'
import { Paths } from '../../app/paths'
import { FaHome, FaMoneyCheck } from 'react-icons/fa'

const links: Link[] = [
    {
        to: Paths.HOME,
        label: 'Home',
        icon: () => <FaHome />,
    },
    {
        to: Paths.HIRTORY,
        label: 'History',
        icon: () => <FaMoneyCheck />,
    },
]

export const Index = () => {
    return (
        <div>
            <Header links={links} />
            <Outlet />
        </div>
    )
}

export default Index
