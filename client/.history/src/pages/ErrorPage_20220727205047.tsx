import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

function ErrorPage() {
    return (
        <div className="body-content">
            <div className='error-page'>

                <div className='error-page-content'>
                    <h1>404</h1>
                    <p>Sorry, the page you are looking for could not be found</p>
                    <Link to='/'>
                        <Button variant="outlined">Back to home</Button>
                    </Link>

                </div>

            </div>
        </div>
    )
}

export default ErrorPage