import React, { useEffect } from 'react'
import { Provider, useDispatch } from 'react-redux'
import { Router } from './routes/Router'
import { store } from './redux/store'
import { AuthService } from './app/services/auth.service'
import { login } from './redux/slices/auth.slice'
import { BrowserRouter, Routes } from 'react-router-dom'

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Router />
            </BrowserRouter>
        </Provider>
    )
}

export default App
