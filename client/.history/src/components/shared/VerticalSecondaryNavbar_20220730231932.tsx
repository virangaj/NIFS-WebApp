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
        <div className='fixed left-0 w-48 top-[2vh] sec-nav-bg ml-40 rounded-l-3xl'>
            <div className='h-[96vh] w-36 flex flex-col items-center py-10 px-2'>

                {pages.map((content: any, index: number) =>
                    <>
                        <div className='nav-title-section'>
                            <p className='nav-title'>{content.section}</p>
                        </div>
                        {content.routes.map((page: any, i: number) => (
                            isAdmin ? <Link to={page.link} key={i}>
                                <button className={location.pathname === page.link ? 'bg-white my-[1vh] px-4 py-2 rounded-2xl text-black' : 'text-white px-4 py-2'}>{page.title}</button>
                            </Link> : (!page.only_admin ? <Link to={page.link} key={i}>
                                <button className={location.pathname === page.link ? 'bg-white my-[1vh] px-4 py-2 rounded-2xl text-black' : 'text-white px-4 py-2'}>{page.title}</button>
                            </Link> : "")
                        ))}
                    </>

                )}

            </div>

        </div>
    )
}

export default VerticalSecondaryNavbar