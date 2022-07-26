import { Box } from '@mui/material'
import React from 'react'

import { FaRegHandshake, FaHome, FaBarcode } from "react-icons/fa";
function SeduSecondaryNavbar() {

    return (
        <Box sx={{ width: '90%' }} className="secondary-navbar nav-flex-section">

            {/* master section */}
            <div className='nav-flex-inside'>
                <div className='nav-flex-section'>
                    <button className='nav-link'><span className='nav-icon'><FaHome /></span> Venue Master</button>
                    <button className='nav-link'><span className='nav-icon'><FaRegHandshake /></span> Participant Master</button>
                </div>
                <div className='nav-title-section'>
                    <p className='nav-title'>Master</p>
                </div>
            </div>

            {/* transaction section */}
            <div className='nav-flex-inside'>
                <div className='nav-flex-section'>
                    <button className='nav-link'><span className='nav-icon'><FaHome /></span> Booking</button>
                    <button className='nav-link'><span className='nav-icon'><FaHome /></span> Event Request</button>
                    <button className='nav-link'><span className='nav-icon'><FaHome /></span> Attendance Feedback</button>
                    <button className='nav-link'><span className='nav-icon'><FaHome /></span> Update Event Material</button>
                    <button className='nav-link'><span className='nav-icon'><FaBarcode /></span> Quick Response Code</button>
                    <button className='nav-link'><span className='nav-icon'><FaHome /></span> Porject Proposal</button>
                    <button className='nav-link'><span className='nav-icon'><FaHome /></span>Material Search</button>
                </div>
                <div className='nav-title-section'>
                    <p className='nav-title'>Transaction</p>
                </div>
            </div>
            {/* reposrts section */}
            <div className='nav-flex-inside'>
                <div className='nav-flex-section'>
                    <button className='nav-link'><span className='nav-icon'><FaHome /></span> SEDU Report Generator</button>
                </div>
                <div className='nav-title-section'>
                    <p className='nav-title'>Reports</p>
                </div>
            </div>
        </Box>
    )
}

export default SeduSecondaryNavbar