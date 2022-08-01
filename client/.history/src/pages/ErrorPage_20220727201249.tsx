import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

function ErrorPage() {
    return (
        <div className="body-content">
            <div className='error-page'>
                <div>
                    <p>404</p>
                    <p>Sorry, the page you are<br />looking for could not be found</p>

                    <Link to='/'>
                        <Button variant="outlined">Home</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ErrorPage