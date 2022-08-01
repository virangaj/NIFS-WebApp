import React from 'react'
import Box from '@mui/material/Box';
import { Link, useLocation } from 'react-router-dom';
import Employees from '../data/Employee.json';

function VerticalSecondaryNavbar(props: any) {
    console.log(props.pages)
    const location = useLocation();
    const user = Employees[0];
    // const isAdmin: Boolean = user.deparment.toUpperCase() === location.pathname.split('/')[1].toUpperCase() && user.admin === true;
    const isAdmin: Boolean = true;

    console.log(isAdmin)
    const pages: any = props.pages;
    return (
        <div className='fixed left-0 w-72 top-[2vh] sec-nav-bg ml-40 rounded-l-3xl'>
            <div className='h-[96vh] w-[90%] flex flex-col items-start ml-4 py-10 px-2'>

                {pages.map((content: any, index: number) =>
                    <>
                        <div className='my-4 w-[80%] py-2 px-4 rounded-2xl nav-title-section pointer-events-none'>
                            <p className='nav-title'>{content.section}</p>
                        </div>
                        {content.routes.map((page: any, i: number) => (
                            isAdmin ? <Link to={page.link} key={i}>
                                <div className='flex items-center'>
                                    <img src={page.img} alt={page.title} className={location.pathname === page.link ? 'w-9 bg-blue-300/60 rounded-full p-1' : 'w-8'} />
                                    <button className={location.pathname === page.link ? 'px-4 py-2 rounded-2xl text-black font-semibold text-left hover:text-blue-500 hover:font-semibold' : 'text-gray-500 px-4 py-2 text-left hover:text-blue-500 hover:font-semibold'}>{page.title}</button>
                                </div>
                            </Link> : (!page.only_admin ? <Link to={page.link} key={i}>
                                <div className='flex items-center'>
                                    <img src={page.img} alt={page.title} className='w-8' />
                                    <button className={location.pathname === page.link ? 'px-4 py-2 rounded-2xl text-black font-semibold text-left hover:text-blue-500 hover:font-semibold' : 'text-gray-500 px-4 py-2 text-left hover:text-blue-500 hover:font-semibold'}>{page.title}</button>
                                </div>
                            </Link> : "")
                        ))}
                    </>

                )}

            </div>

        </div>
    )
}

export default VerticalSecondaryNavbar