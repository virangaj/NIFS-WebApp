import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

function ErrorPage() {
    return (
        <div className="body-content">
            <div className='error-page'>
                <div>
                    <p>404</p>
                    <hr />
                    <p>Sorry, the page you are<br />looking for could not be found</p>

                    <Link to='/'>
                        <Button variant="outlined">Back to home</Button>
                    </Link>
                </div>
                <div>
                    <img src='https://cdn.dribbble.com/users/1408464/screenshots/6377404/404_illustration_4x.png' alt='error' />

                </div>
            </div>
        </div>
    )
}

export default ErrorPage