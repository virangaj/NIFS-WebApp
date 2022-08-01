import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

function ErrorPage() {
    return (
        <div className="body-content">
            <div className='error-page'>

                <p>404</p>

                <p>Sorry, the page you arelooking for could not be found</p>

                <Link to='/'>
                    <Button variant="outlined">Back to home</Button>
                </Link>


            </div>
        </div>
    )
}

export default ErrorPage