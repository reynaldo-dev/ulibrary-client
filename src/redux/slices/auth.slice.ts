import { createSlice } from '@reduxjs/toolkit'
export interface Auth {
    user: User | null
    isAuth: boolean
}
interface User {
    id_user: number
    email: string
    first_name: string
    last_name: string
    id_role: number
    uuid: string
    role: Role
}

interface Role {
    id_role: number
    role: string
}

const initialState: Auth = {
    user: null,
    isAuth: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            localStorage.setItem('token', action.payload.token)
            state.user = action?.payload.user
            state.isAuth = true
        },
    },
})

export const { login } = authSlice.actions
export default authSlice.reducer
