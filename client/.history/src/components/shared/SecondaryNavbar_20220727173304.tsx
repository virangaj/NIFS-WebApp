import React from 'react'

import Box from '@mui/material/Box';
import { Link, useLocation } from 'react-router-dom';
import Employees from '../sampleData/Employee.json';
function SecondaryNavbar(props: any) {

    console.log(Employees)
    const location = useLocation();
    console.log(location.pathname)
    const pages: any = props.pages;
    return (
        <Box sx={{ width: '90%' }} className="secondary-navbar nav-flex-section">
            {pages.map((content: any, index: number) => (
                <div className='nav-flex-inside' key={index}>
                    <div className='nav-flex-section'>
                        {content.routes.map((page: any, i: number) => (
                            <Link to={page.link} key={i}>
                                <button className={location.pathname === page.link ? 'nav-link nav-link-active' : 'nav-link'}><span className='nav-icon'><img src={page.img} alt={page.title} /></span> {page.title}</button>
                            </Link>


                        ))}
                    </div>
                    <div className='nav-title-section'>
                        <p className='nav-title'>{content.section}</p>
                    </div>
                </div>
            ))}
        </Box>


    )
}

export default SecondaryNavbar