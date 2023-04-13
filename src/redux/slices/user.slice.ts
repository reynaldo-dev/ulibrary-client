import { createSlice } from '@reduxjs/toolkit'
import { User } from './auth.slice'
import { getUsers } from '../thunks/user.thunk'

export interface UserState {
    users: User[]
    isLoading: boolean
}

const initialState: UserState = {
    users: [],
    isLoading: true,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.users = action?.payload || []
            state.isLoading = false
        })
        builder.addCase(getUsers.pending, (state) => {
            state.isLoading = true
        })
    },
})

export default userSlice.reducer
