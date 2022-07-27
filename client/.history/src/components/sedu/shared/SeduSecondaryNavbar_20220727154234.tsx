import { Box } from '@mui/material'
import React from 'react'

import { FaRegHandshake, FaHome, FaBarcode, FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';
function SeduSecondaryNavbar() {

    const pages: any = [
        {
            section: 'Master',
            only_admin: true,
            routes: [
                {
                    title: 'Venue Master',
                    link: '/sedu/venue-master',
                    img: 'https://img.icons8.com/color/50/000000/home--v1.png',
                    only_admin: true,
                },
                {
                    title: 'Participant Master',
                    link: '/sedu/participant-master',
                    img: 'https://img.icons8.com/ultraviolet/50/000000/handshake.png',
                    only_admin: true
                }
            ]
        },
        {
            section: 'Transaction',
            only_admin: false,
            routes: [
                {
                    title: 'Booking',
                    link: '/sedu/booking',
                    img: 'https://img.icons8.com/external-flaticons-flat-flat-icons/50/000000/external-booking-vacation-planning-trip-abroad-flaticons-flat-flat-icons.png',
                    only_admin: false
                },
                {
                    title: 'Event Request',
                    link: '/sedu/event-request',
                    img: 'https://img.icons8.com/dusk/50/000000/invite.png',
                    only_admin: false
                },
                {
                    title: 'Attendance Feedback',
                    link: '/sedu/attendance-feedback',
                    img: 'https://img.icons8.com/external-fauzidea-flat-fauzidea/50/000000/external-feedback-online-learning-fauzidea-flat-fauzidea.png',
                    only_admin: false
                },
                {
                    title: 'Update Event Material',
                    link: '/sedu/update-material',
                    img: 'https://img.icons8.com/fluency/50/000000/available-updates.png',
                    only_admin: false
                },
                {
                    title: 'Quick Response Code',
                    link: '/sedu/quick-response',
                    img: 'https://img.icons8.com/color/50/000000/qr-code--v1.png',
                    only_admin: false
                },
                {
                    title: 'Project Proposal',
                    link: '/sedu/project-proposal',
                    img: 'https://img.icons8.com/fluency/50/000000/documents.png',
                    only_admin: false
                },
                {
                    title: 'Material Search',
                    link: '/sedu/material-search',
                    img: 'https://img.icons8.com/fluency/50/000000/search.png',
                    only_admin: false
                },
            ]
        },
        {
            section: 'Reports',
            only_admin: true,
            routes: [
                {
                    title: 'SEDU Report Generator ',
                    link: '/sedu/report-generator',
                    img: 'https://img.icons8.com/cute-clipart/50/000000/load-from-file.png',
                    only_admin: true,
                },
            ]
        },
    ]

    console.log(pages)

    return (
        <>
            <Box sx={{ width: '90%' }} className="secondary-navbar nav-flex-section">

                {/* master section */}
                <div className='nav-flex-inside'>
                    <div className='nav-flex-section'>
                        <Link to="sedu/venue-master">
                            <button className='nav-link'><span className='nav-icon'><img src="https://img.icons8.com/color/50/000000/home--v1.png" alt='home' /></span> Venue Master</button>
                        </Link>
                        <Link to="sedu/participant-master">
                            <button className='nav-link'><span className='nav-icon'><img src="https://img.icons8.com/ultraviolet/50/000000/handshake.png" alt='handshake' /></span> Participant Master</button>
                        </Link>

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
                        <button className='nav-link'><span className='nav-icon'><img src="https://img.icons8.com/fluency/50/000000/documents.png" alt='upload doc' /></span> Project Proposal</button>
                        <button className='nav-link'><span className='nav-icon'><img src="https://img.icons8.com/fluency/50/000000/search.png" alt='search' /></span>Material Search</button>
                    </div>
                    <div className='nav-title-section'>
                        <p className='nav-title'>Transaction</p>
                    </div>
                </div>
                {/* reposrts section */}
                <div className='nav-flex-inside'>
                    <div className='nav-flex-section'>
                        <button className='nav-link'><span className='nav-icon'><img src="https://img.icons8.com/cute-clipart/50/000000/load-from-file.png" alt='report' /></span> SEDU Report Generator</button>
                    </div>
                    <div className='nav-title-section'>
                        <p className='nav-title'>Reports</p>
                    </div>
                </div>
            </Box>


            <Box sx={{ width: '90%' }} className="secondary-navbar nav-flex-section">
                {pages.map((content: any, index: number) => (
                    <div className='nav-flex-inside' key={index}>
                        <div className='nav-flex-section'>

                        </div>
                        <div className='nav-title-section'>
                            <p className='nav-title'>{content.section}</p>
                        </div>
                    </div>
                ))}
            </Box>

        </>
    )
}

export default SeduSecondaryNavbar