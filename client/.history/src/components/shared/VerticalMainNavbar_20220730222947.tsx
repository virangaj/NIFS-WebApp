import { Button } from '@mui/material'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Pages from '../data/MainNavPages.json'

import Logo from '../../images/nifs_logo.png'


function VerticalMainNavbar() {

    const location: any = useLocation();

    return (
        <div className='fixed left-0 w-40 bg-blue-400 top-[2vh] visible md:visible'>

            <div className='bg-red-400 h-[96vh] w-32 flex flex-col items-center py-10 ml-4 rounded-l-3xl'>
                <img src={Logo} alt="logo" className="nav-logo" />
                {Pages.map((page, index) => (
                    location.pathname.split('/')[1] === page.link.split('/')[1] ?
                        <Link to={page.link} style={{ textDecoration: 'none' }} key={index}>
                            <Button

                                sx={{ my: "1vh", color: 'white', display: 'block' }}
                                style={{ backgroundColor: '#fff', color: '#000', fontWeight: 700 }}


                            >
                                {page.title}
                            </Button>
                        </Link>
                        :
                        <Link to={page.link} style={{ textDecoration: 'none' }} key={index}>
                            <Button
                                key={page.id}

                                sx={{ my: "1vh", color: 'white', display: 'block' }}

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