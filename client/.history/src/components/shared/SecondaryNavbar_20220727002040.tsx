import React from 'react'

import Box from '@mui/material/Box';
import { Link, useLocation } from 'react-router-dom';

function SecondaryNavbar({ id, title, link, access }: any) {
    const location = useLocation();

    return (
        <Box sx={{ width: '90%' }} className="secondary-navbar">
            <div>

            </div>
        </Box>
    )
}

export default SecondaryNavbar