import { Button } from '@mui/material'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Pages from '../data/MainNavPages.json'
import { HiMenuAlt2 } from "react-icons/hi";
import Logo from '../../images/nifs_logo.png'


function VerticalMainNavbar() {

    const location: any = useLocation();

    return (
        <>
            <div className='fixed left-0 w-48 top-[2vh] main-nav-bg ml-4 rounded-l-3xl'>
                <div className='h-[96vh] w-36 flex flex-col items-center py-10 px-2'>
                    <Link to='/'>
                        <img src={Logo} alt="logo" className="nav-logo" />
                    </Link>
                    {Pages.map((page, index) => (
                        location.pathname.split('/')[1] === page.link.split('/')[1] ?
                            <Link to={page.link} style={{ textDecoration: 'none' }} key={index}>
                                <button className='bg-white my-[1vh] px-4 py-2 rounded-2xl text-black font-bold hover:font-bold'>
                                    {page.title}
                                </button>
                            </Link>
                            :
                            <Link to={page.link} style={{ textDecoration: 'none' }} key={index}>
                                <button className='my-[1vh] px-4 py-2 rounded-2xl text-white hover:font-bold'>

                                    {page.title}
                                </button>
                            </Link>
                    ))}

                    <img
                        className="-mt-1 h-8 w-8 rounded-full ml-5 cursor-pointer"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                    />
                </div>
            </div>
            {/* <div className='fixed left-0 w-24 top-[2vh] visible md:invisible main-nav-bg ml-2 rounded-l-3xl'>
                <div className='h-[96vh] w-20 flex flex-col items-center py-10 px-2'>
                    <p className='text-white text-2xl cursor-pointer'>

                        <HiMenuAlt2 />
                    </p>


                </div>
            </div> */}
        </>
    )
}

export default VerticalMainNavbar