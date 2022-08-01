import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

function ErrorPage() {
    return (
        <div className="body-content">
            <div className='error-page'>

                <div className='error-page-content'>
                    <img src="https://img.icons8.com/fluency/100/000000/cross-cloud.png" alt='erro' />

                    <h1>404</h1>
                    <p>Sorry, the page you are looking for could not be found</p>
                    <Link to='/'>
                        <Button variant="contained" color='error'>Back to home</Button>
                    </Link>

                </div>

            </div>
        </div>
    )
}

export default ErrorPage