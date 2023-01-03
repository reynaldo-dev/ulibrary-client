import React from 'react'
import { Link } from 'react-router-dom'
import { Paths } from '../../app/paths'

export const Home = () => {
    return (
        <div>
            <Link to={Paths.HIRTORY}>history</Link>
        </div>
    )
}
