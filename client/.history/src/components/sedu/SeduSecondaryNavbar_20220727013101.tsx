import { Box } from '@mui/material'
import React from 'react'

import { FaRegHandshake, FaHome, FaBarcode, FaSearch } from "react-icons/fa";
function SeduSecondaryNavbar() {

    return (
        <Box sx={{ width: '90%' }} className="secondary-navbar nav-flex-section">

            {/* master section */}
            <div className='nav-flex-inside'>
                <div className='nav-flex-section'>
                    <button className='nav-link'><span className='nav-icon'><img src="https://img.icons8.com/color/50/000000/home--v1.png" alt='home' /></span> Venue Master</button>
                    <button className='nav-link'><span className='nav-icon'><img src="https://img.icons8.com/ultraviolet/50/000000/handshake.png" alt='handshake' /></span> Participant Master</button>
                </div>
                <div className='nav-title-section'>
                    <p className='nav-title'>Master</p>
                </div>
            </div>

            {/* transaction section */}
            <div className='nav-flex-inside'>
                <div className='nav-flex-section'>
                    <button className='nav-link'><span className='nav-icon'><img src="https://img.icons8.com/external-flaticons-flat-flat-icons/50/000000/external-booking-vacation-planning-trip-abroad-flaticons-flat-flat-icons.png" alt='booking' /></span> Booking</button>
                    <button className='nav-link'><span className='nav-icon'><img src="https://img.icons8.com/dusk/50/000000/invite.png" alt='request' /></span> Event Request</button>
                    <button className='nav-link'><span className='nav-icon'><img src="https://img.icons8.com/external-fauzidea-flat-fauzidea/50/000000/external-feedback-online-learning-fauzidea-flat-fauzidea.png" alt='feedback' /></span> Attendance Feedback</button>
                    <button className='nav-link'><span className='nav-icon'><img src="https://img.icons8.com/fluency/50/000000/available-updates.png" alt='update' /></span> Update Event Material</button>
                    <button className='nav-link'><span className='nav-icon'><img src="https://img.icons8.com/color/50/000000/qr-code--v1.png" alt='qr' /></span> Quick Response Code</button>
                    <button className='nav-link'><span className='nav-icon'><FaHome /></span> Porject Proposal</button>
                    <button className='nav-link'><span className='nav-icon'><FaSearch /></span>Material Search</button>
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