import React, { useEffect } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { Router } from './routes/Router'
import { RootState, store } from './redux/store'
import { AuthService } from './app/services/auth.service'
import { login } from './redux/slices/auth.slice'
import {
    BrowserRouter,
    Navigate,
    Outlet,
    Routes,
    useNavigate,
} from 'react-router-dom'
import { Paths } from './app/paths'

function App() {
    const authService = new AuthService()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const whoAmI = async () => {
        const response = await authService.whoami()
        if (response?.user) {
            dispatch(login(response.user))
            return <Navigate to={Paths.BOOKS} />
        }
        navigate(Paths.AUTH)
    }
    useEffect(() => {
        whoAmI()
    }, [])
    return <Router />
}

export default App
