import React from 'react'
import { useLocation } from 'react-router-dom'
import Employees from '../sampleData/Employee.json'
function SeduReportGenerator() {

    const location = useLocation();
    const user = Employees[1];




    return (
        <div>SeduReportGenerator</div>
    )
}

export default SeduReportGenerator