import { Outlet } from 'react-router-dom'
import { FaHome, FaMoneyCheck, FaUser } from 'react-icons/fa'

import { Header, Link } from '../../components/app/Header'
import { Paths } from '../../app/paths'

const links: Link[] = [
    {
        to: Paths.HOME,
        label: 'Home',
        icon: () => <FaHome />,
    },
    {
        to: Paths.BORROWS,
        label: 'Borrows',
        icon: () => <FaMoneyCheck />,
    },
    {
        to: Paths.USERS,
        label: 'Users',
        icon: () => <FaUser />,
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
