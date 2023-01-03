import { createAsyncThunk } from '@reduxjs/toolkit'
import { UserService } from '../../app/services/user.service'

interface Query {
    first_name: string
}
const userService = new UserService()
export const getUsers = createAsyncThunk(
    'books/getUsers',
    async (query: Query) => {
        try {
            const books = await userService.getUsers(query.first_name)
            return books
        } catch (error) {
            return null
        }
    },
)
