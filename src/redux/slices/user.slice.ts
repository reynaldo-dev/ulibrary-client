import { createSlice } from '@reduxjs/toolkit'
import { User } from './auth.slice'
import { getUsers } from '../thunks/user.thunk'

export interface UserState {
    users: User[]
}

const initialState: UserState = {
    users: [],
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.users = action?.payload || []
        })
    },
})

export default userSlice.reducer
