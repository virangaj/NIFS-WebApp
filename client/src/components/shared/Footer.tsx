import React from 'react'

import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaLinkedinIn } from "react-icons/fa";

import './navbar.css'

function Footer() {
    return (
        <div className='footer'>
            <div className='flex justify-between align-middle w-[200px] mx-auto text-2xl mb-4 text-gray-400'>
                <a href="https://www.facebook.com/nifslk" target='_blank' rel="noreferrer" className='hover:text-white'>
                    <FaFacebookF />
                </a>

                <a href="https://twitter.com/nifslk" target='_blank' rel="noreferrer" className='hover:text-white'>
                    <FaInstagram />
                </a>

                <a href="https://www.instagram.com/nifs_lk/" target='_blank' rel="noreferrer" className='hover:text-white'>
                    <FaTwitter />
                </a>

                <a href="https://www.youtube.com/user/IFSweba" target='_blank' rel="noreferrer" className='hover:text-white'>
                    <FaYoutube />
                </a>

                <a href="https://www.linkedin.com/company/nifslk/" target='_blank' rel="noreferrer" className='hover:text-white'>
                    <FaLinkedinIn />
                </a>
            </div>

            <a className='text-sm text-center' href="https://www.nifs.ac.lk/" target='_blank' rel="noreferrer">
                <p className="text-white">  © National Institute of Fundamental Studies, Hantana Road, Kandy, Sri Lanka</p>
            </a>
        </div>
    )
}

export default Footer
