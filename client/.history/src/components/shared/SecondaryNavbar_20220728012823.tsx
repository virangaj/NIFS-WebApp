import React from 'react'

import Box from '@mui/material/Box';
import { Link, useLocation } from 'react-router-dom';
import Employees from '../sampleData/Employee.json';
function SecondaryNavbar(props: any) {
    const location = useLocation();
    const user = Employees[1];
    // const isAdmin: Boolean = user.deparment.toUpperCase() === location.pathname.split('/')[1].toUpperCase() && user.admin === true;
    const isAdmin: Boolean = true;

    console.log(isAdmin)
    const pages: any = props.pages;
    return (
        <Box sx={{ width: '90%' }} className="secondary-navbar nav-flex-section">
            {pages.map((content: any, index: number) => (
                isAdmin ? <div className='nav-flex-inside' key={index}>
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
                </div> :
                    !content.only_admin ? <div className='nav-flex-inside' key={index}>
                        <div className='nav-flex-section'>
                            {content.routes.map((page: any, i: number) => (
                                isAdmin ? <Link to={page.link} key={i}>
                                    <button className={location.pathname === page.link ? 'nav-link nav-link-active' : 'nav-link'}><span className='nav-icon'><img src={page.img} alt={page.title} /></span> {page.title}</button>
                                </Link> : (!page.only_admin ? <Link to={page.link} key={i}>
                                    <button className={location.pathname === page.link ? 'nav-link nav-link-active' : 'nav-link'}><span className='nav-icon'><img src={page.img} alt={page.title} /></span> {page.title}</button>
                                </Link> : "")
                            ))}
                        </div>
                        <div className='nav-title-section'>
                            <p className='nav-title'>{content.section}</p>
                        </div>
                    </div> : ""
            ))}
        </Box>


    )
}

export default SecondaryNavbar