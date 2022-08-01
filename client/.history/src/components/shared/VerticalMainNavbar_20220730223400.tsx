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
                            <button className='bg-white my-[1vh] p-4 '>
                                {page.title}
                            </button>
                        </Link>
                        :
                        <Link to={page.link} style={{ textDecoration: 'none' }} key={index}>
                            <button className='my-[1vh] p-4'>

                                {page.title}
                            </button>
                        </Link>
                ))}
            </div>
        </div>
    )
}

export default VerticalMainNavbar