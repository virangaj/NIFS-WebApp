import { Box } from '@mui/material'
import React from 'react'

import { FaArtstation, FaApple, FaAppStoreIos } from "react-icons/fa";
function SeduSecondaryNavbar() {

    return (
        <Box sx={{ width: '90%' }} className="secondary-navbar nav-flex-section">
            <div className='nav-flex-inside'>

                <div className='nav-flex-section'>
                    <p className='nav-title'>Venue Master</p>
                    <p className='nav-title'>Participant Master</p>

                </div>
                <div className='nav-title-section'>
                    <p className='nav-title'>Master</p>
                </div>
            </div>
            <div className='nav-flex-inside'>

                <div className='nav-flex-section'>
                    <p className='nav-title'>Booking</p>
                    <p className='nav-title'>Master</p>
                    <p className='nav-title'>Master</p>
                    <p className='nav-title'>Master</p>
                </div>
                <div className='nav-title-section'>
                    <p className='nav-title'>Master</p>
                </div>
            </div>
        </Box>
    )
}

export default SeduSecondaryNavbar