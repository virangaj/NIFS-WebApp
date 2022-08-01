import { Button } from '@mui/material'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Pages from '../data/MainNavPages.json'

import Logo from '../../images/nifs_logo.png'


function VerticalMainNavbar() {

    const location: any = useLocation();

    return (
        <>
            <div className='fixed left-0 w-48 top-[2vh] visible md:visible main-nav-bg ml-4 rounded-l-3xl'>
                <div className='h-[96vh] w-36 flex flex-col items-center py-10 px-2'>
                    <Link to='/'>
                        <img src={Logo} alt="logo" className="nav-logo" />
                    </Link>
                    {Pages.map((page, index) => (
                        location.pathname.split('/')[1] === page.link.split('/')[1] ?
                            <Link to={page.link} style={{ textDecoration: 'none' }} key={index}>
                                <button className='bg-white my-[1vh] px-4 py-2 rounded-2xl text-black'>
                                    {page.title}
                                </button>
                            </Link>
                            :
                            <Link to={page.link} style={{ textDecoration: 'none' }} key={index}>
                                <button className='my-[1vh] px-4 py-2 rounded-2xl text-white'>

                                    {page.title}
                                </button>
                            </Link>
                    ))}
                </div>
            </div>
            <div className='fixed left-0 w-48 top-[2vh] visible md:invisible main-nav-bg ml-4 rounded-l-3xl'>
                <div className='h-[96vh] w-36 flex flex-col items-center py-10 px-2'>
                    <h1>Menu</h1>
                </div>
            </div>
        </>
    )
}

export default VerticalMainNavbar