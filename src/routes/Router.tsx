import React, { Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Paths } from '../app/paths'
import { RootState } from '../redux/store'
import { Roles } from '../app/roles'
import { MainRoute } from './MainRoute'
import { PublicRoute } from './PublicRoute'
import { LoadAnimation } from '../components/app/Animation'
import lazyLoadAnimation from '../../public/lazy-animation.json'

const Auth = React.lazy(() => import('../screens/auth/Auth'))
const Books = React.lazy(() => import('../screens/librarian/Books'))
const StudentBooks = React.lazy(() => import('../screens/student/Books'))
const Borrows = React.lazy(() => import('../screens/librarian/Borrows'))
const Users = React.lazy(() => import('../screens/librarian/Users'))
const Student = React.lazy(() => import('../screens/student/Index'))
const Librarian = React.lazy(() => import('../screens/librarian/Index'))
const History = React.lazy(() => import('../screens/student/History'))

export const Router = () => {
    const { user } = useSelector((state: RootState) => state.auth)

    return (
        <Suspense
            fallback={<LoadAnimation animationData={lazyLoadAnimation} />}
        >
            <Routes>
                <Route element={<PublicRoute />}>
                    <Route path={Paths.AUTH} element={<Auth />} />
                </Route>

                {user?.role?.role === Roles.LIBRARIAN && (
                    <Route
                        element={
                            <MainRoute>
                                <Librarian />
                            </MainRoute>
                        }
                    >
                        <Route path={Paths.HOME} element={<Books />} />
                        <Route path={Paths.BORROWS} element={<Borrows />} />
                        <Route path={Paths.USERS} element={<Users />} />
                    </Route>
                )}

                {user?.role?.role === Roles.STUDENT && (
                    <Route
                        element={
                            <MainRoute>
                                <Student />
                            </MainRoute>
                        }
                    >
                        <Route path={Paths.HOME} element={<StudentBooks />} />
                        <Route path={Paths.HIRTORY} element={<History />} />
                    </Route>
                )}
            </Routes>
        </Suspense>
    )
}
