import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import Employees from '../sampleData/Employee.json'
function SeduReportGenerator() {

    const location = useLocation().pathname.split('/')[1];
    const user = Employees[1];

    if (location !== user.deparment && user.admin === false) {
        return (
            <Navigate replace to='/error-404' />
        )
    }

    return (
        <div>SeduReportGenerator</div>
    )
}

export default SeduReportGenerator