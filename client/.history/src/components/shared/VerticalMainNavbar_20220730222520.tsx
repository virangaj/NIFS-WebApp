import { Button } from '@mui/material'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Pages from '../data/MainNavPages.json'

import Logo from '../../images/nifs_logo.png'


function VerticalMainNavbar() {

    const location: any = useLocation();

    return (
        <div className='fixed left-0 w-40 bg-blue-400 grid grid-cols-1 content-center'>

            <div className='bg-red-400 h-[95vh] w-32 flex flex-col items-center py-10 ml-4 rounded-l-3xl'>
                <img src={Logo} alt="logo" className="nav-logo" />
                {Pages.map((page, index) => (
                    location.pathname.split('/')[1] === page.link.split('/')[1] ?
                        <Link to={page.link} style={{ textDecoration: 'none' }} key={index}>
                            <Button

                                sx={{ my: "5px", color: 'white', display: 'block' }}
                                style={{ backgroundColor: '#fff', color: '#000', fontWeight: 700 }}


                            >
                                {page.title}
                            </Button>
                        </Link>
                        :
                        <Link to={page.link} style={{ textDecoration: 'none' }} key={index}>
                            <Button
                                key={page.id}

                                sx={{ my: "5px", color: 'white', display: 'block' }}

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