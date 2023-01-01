import React from 'react'
import { Outlet } from 'react-router-dom'

export const Index = () => {
    return (
        <div>
            Index student <Outlet />
        </div>
    )
}
