import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import Employees from '../../components/data/Employee.json'
function SeduReportGenerator() {

    const location = useLocation().pathname.split('/')[1];
    const user = Employees[1]

    if (location.toUpperCase() === user.deparment.toUpperCase() && user.admin === true) {
        console.log('consluosion : ', location.toUpperCase() === user.deparment.toUpperCase() && user.admin === true);

    }
    else {
        return (
            <Navigate replace to='/error-404' />
        )
    }

    return (
        <div className='sub-body-content'>
            <h1 className='page-title'>Sedu Report Generator</h1>
            <hr className='horizontal-line' /></div>
    )
}

export default SeduReportGenerator