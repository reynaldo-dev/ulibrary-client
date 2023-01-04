import { createAsyncThunk } from '@reduxjs/toolkit'
import { BorrowService } from '../../app/services/borrow.service'

interface Query {
    //email or first_name
    query: string
}
const borrowService = new BorrowService()
export const getBorrows = createAsyncThunk(
    'borrow/getBorros',
    async (query: Query) => {
        try {
            const borrows = await borrowService.getBorrows(query.query)
            return borrows
        } catch (error) {
            return null
        }
    },
)
