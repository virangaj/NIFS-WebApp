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
                    <div className="w-full">
                        <img
                            src="https://i.pcmag.com/imagery/reviews/05cItXL96l4LE9n02WfDR0h-6..v1575422587.png"
                            // src={img}
                            alt="card figure"
                            className="mt-8 shadow-2xl overflow-hidden w-full img-shadow"
                            style={{
                                backgroundSize: '100%',
                            }}
                        />
                    </div>
                    <img src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80' alt='profle' className='rounded-full w-16 h-16 mt-10 bg-cover' />
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