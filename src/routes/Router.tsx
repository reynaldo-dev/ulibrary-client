import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { Paths } from '../app/paths'
import { Auth } from '../screens/auth/Auth'
import { RootState } from '../redux/store'
import { Roles } from '../app/roles'
import { MainRoute } from './MainRoute'
import { Books } from '../screens/librarian/Books'
import { Books as StudentBooks } from '../screens/student/Books'
import { Borrows } from '../screens/librarian/Borrows'
import { Users } from '../screens/librarian/Users'
import { Index as Student } from '../screens/student/Index'
import { Index as Librarian } from '../screens/librarian/Index'
import { PublicRoute } from './PublicRoute'
import { History } from '../screens/student/History'

export const Router = () => {
    const { user } = useSelector((state: RootState) => state.auth)

    return (
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
    )
}
