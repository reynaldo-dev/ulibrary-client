import { createSlice } from '@reduxjs/toolkit'
export interface Auth {
    user: User | null
    isAuth: boolean
}
export interface User {
    id: string
    email: string
    first_name: string
    last_name: string
    roleId: string
    role: Role
}

interface Role {
    roleId: string
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
            state.user = action?.payload
            state.isAuth = true
        },
    },
})

export const { login } = authSlice.actions
export default authSlice.reducer
