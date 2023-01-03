import React, { useEffect } from 'react'
import { Routes, Route, useNavigate, Outlet, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Paths } from '../app/paths'
import { Auth } from '../screens/auth/Auth'
import { RootState } from '../redux/store'
import { Roles } from '../app/roles'
import { AuthService } from '../app/services/auth.service'
import { login } from '../redux/slices/auth.slice'
import { MainRoute } from './MainRoute'
import { Home } from '../screens/librarian/Home'
import { Home as StudentHome } from '../screens/student/Home'
import { Books } from '../screens/librarian/Books'
import { Borrows } from '../screens/librarian/Borrows'
import { Users } from '../screens/librarian/Users'
import { Index as Student } from '../screens/student/Index'
import { Index as Librarian } from '../screens/librarian/Index'
import { LoginComponent } from '../components/Login/Login'
import { getBooks } from '../redux/thunks/books.thunks'
import { PublicRoute } from './PublicRoute'

export const Router = () => {
    const { user } = useSelector((state: RootState) => state.auth)

    return (
        <Routes>
            <Route element={<PublicRoute />}>
                <Route path={Paths.AUTH} element={<Auth />} />
            </Route>

            {user?.role?.role === Roles.LIBRARIAN ? (
                <Route
                    element={
                        <MainRoute>
                            <Librarian />
                        </MainRoute>
                    }
                >
                    <Route path={Paths.HOME} element={<Home />} />
                    <Route path={Paths.BOOKS} element={<Books />} />
                    <Route path={Paths.BORROWS} element={<Borrows />} />
                    <Route path={Paths.USERS} element={<Users />} />
                </Route>
            ) : (
                <Route
                    element={
                        <MainRoute>
                            <Student />
                        </MainRoute>
                    }
                >
                    <Route index element={<StudentHome />} />
                </Route>
            )}
        </Routes>
    )
}
