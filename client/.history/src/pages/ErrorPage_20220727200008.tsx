import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

function ErrorPage() {
    return (
        <div className="body-content">
            <Link to=''>
                <Button>Home</Button>
            </Link>
        </div>
    )
}

export default ErrorPage