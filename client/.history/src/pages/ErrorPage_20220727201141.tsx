import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

function ErrorPage() {
    return (
        <div className="body-content">
            <div className='error-page'>
                <h1>404 - Page not found</h1>
                <Link to='/'>
                    <Button variant="outlined">Home</Button>
                </Link>
            </div>
        </div>
    )
}

export default ErrorPage