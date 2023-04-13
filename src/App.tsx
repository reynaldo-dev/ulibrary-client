import { useEffect } from 'react'
import { Router } from './routes/Router'
import { useAppDispatch } from './redux/store'
import { AuthService } from './app/services/auth.service'
import { login } from './redux/slices/auth.slice'
import { Navigate, useNavigate } from 'react-router-dom'
import { Paths } from './app/paths'

function App() {
    const authService = new AuthService()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const whoAmI = async () => {
        const response = await authService.whoami()
        if (response?.user) {
            dispatch(login(response.user))
            return <Navigate to={Paths.HOME} />
        }
        navigate(Paths.AUTH)
    }
    useEffect(() => {
        whoAmI()
    }, [])
    return <Router />
}

export default App
