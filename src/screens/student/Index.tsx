import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header, Link } from '../../components/app/Header'
import { Paths } from '../../app/paths'

const links: Link[] = [
    {
        to: Paths.HOME,
        label: 'Home',
    },
    {
        to: Paths.HIRTORY,
        label: 'History',
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
