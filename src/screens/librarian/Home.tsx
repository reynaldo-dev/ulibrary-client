import React from 'react'
import { Link } from 'react-router-dom'

export const Home = () => {
    return (
        <div>
            Home liubrarian
            <br />
            <Link to='/books'>books</Link>
            <br />
            <Link to='/borrows'>borrows</Link>
        </div>
    )
}
