import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import Employees from '../data/Employee.json'
function SeduReportGenerator() {

    const location = useLocation().pathname.split('/')[1];
    const user = Employees[0]

    if (location.toUpperCase() === user.deparment.toUpperCase() && user.admin === true) {
        console.log('consluosion : ', location.toUpperCase() === user.deparment.toUpperCase() && user.admin === true);

    }
    else {
        return (
            <Navigate replace to='/error-404' />
        )
    }

    return (
        <div>SeduReportGenerator</div>
    )
}

export default SeduReportGenerator