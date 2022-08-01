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
        <div className='fixed left-0 w-48 top-[2vh] sec-nav-bg ml-4 rounded-l-3xl'>
            <div className='h-[96vh] w-36 flex flex-col items-center py-10 px-2'>
            </div>

        </div>
    )
}

export default VerticalSecondaryNavbar