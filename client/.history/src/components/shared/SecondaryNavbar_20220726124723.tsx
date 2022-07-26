import React from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Link, useLocation } from 'react-router-dom';

function SecondaryNavbar() {
    const location = useLocation();
    const pages = [
        {
            id: 0,
            title: 'New Request',
            link: '/transport',
        },
        {
            id: 1,
            title: 'Recommend Request',
            link: '/transport/recommend',
        },
        {
            id: 2,
            title: 'Approve Request',
            link: '/transport/approve',
        },
    ];
    return (
        <Box sx={{ width: '90%' }} className="secondary-navbar">
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={location.pathname} centered>
                    {pages &&
                        pages.map((page) => (
                            <Tab
                                key={page.id}
                                label={page.title}
                                value={page.link}
                                component={Link}
                                to={page.link}
                            />
                        ))}
                </Tabs>
            </Box>
        </Box>
    )
}

export default SecondaryNavbar