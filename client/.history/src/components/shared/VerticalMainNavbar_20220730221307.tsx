import { Button } from '@mui/material'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Pages from '../data/MainNavPages.json'



function VerticalMainNavbar() {

    const location: any = useLocation();

    return (
        <div className='fixed left-0 top-0'>
            <div className='bg-red-400 h-[100vh] w-32 flex flex-col items-end'>
                {Pages.map((page, index) => (
                    location.pathname.split('/')[1] === page.link.split('/')[1] ?
                        <Link to={page.link} style={{ textDecoration: 'none' }} key={index}>
                            <Button

                                sx={{ color: 'white', display: 'block' }}
                                style={{ backgroundColor: '#fff', color: '#000', fontWeight: 700 }}


                            >
                                {page.title}
                            </Button>
                        </Link>
                        :
                        <Link to={page.link} style={{ textDecoration: 'none' }} key={index}>
                            <Button
                                key={page.id}

                                sx={{ color: 'white', display: 'block' }}

                            >
                                {page.title}
                            </Button>
                        </Link>
                ))}
            </div>
        </div>
    )
}

export default VerticalMainNavbar