import { Box } from '@mui/material'
import React from 'react'

import { FaArtstation, FaApple, FaAppStoreIos, FaHome } from "react-icons/fa";
function SeduSecondaryNavbar() {

    return (
        <Box sx={{ width: '90%' }} className="secondary-navbar nav-flex-section">

            {/* master section */}
            <div className='nav-flex-inside'>
                <div className='nav-flex-section'>
                    <p className='nav-link'><span className='nav-icon'><FaHome /></span> Venue Master</p>
                    <p className='nav-link'><span className='nav-icon'><FaHome /></span> Participant Master</p>
                </div>
                <div className='nav-title-section'>
                    <p className='nav-title'>Master</p>
                </div>
            </div>

            {/* transaction section */}
            <div className='nav-flex-inside'>
                <div className='nav-flex-section'>
                    <p className='nav-link'><span className='nav-icon'><FaHome /></span> Booking</p>
                    <p className='nav-link'><span className='nav-icon'><FaHome /></span> Event Request</p>
                    <p className='nav-link'><span className='nav-icon'><FaHome /></span> Attendance Feedback</p>
                    <p className='nav-link'><span className='nav-icon'><FaHome /></span> Update Event Material</p>
                    <p className='nav-link'><span className='nav-icon'><FaHome /></span> Quick Response Code</p>
                    <p className='nav-link'><span className='nav-icon'><FaHome /></span> Porject Proposal</p>
                    <p className='nav-link'><span className='nav-icon'><FaHome /></span>Material Search</p>
                </div>
                <div className='nav-title-section'>
                    <p className='nav-title'>Transaction</p>
                </div>
            </div>
            {/* reposrts section */}
            <div className='nav-flex-inside'>
                <div className='nav-flex-section'>
                    <p className='nav-link'><span className='nav-icon'><FaHome /></span> SEDU Report Generator</p>
                </div>
                <div className='nav-title-section'>
                    <p className='nav-title'>Reports</p>
                </div>
            </div>
        </Box>
    )
}

export default SeduSecondaryNavbar