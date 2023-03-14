import React from 'react';

import {
	FaFacebookF,
	FaInstagram,
	FaTwitter,
	FaYoutube,
	FaLinkedinIn,
} from 'react-icons/fa';

import './navbar.css';

function Footer() {
	return (
		<div className='shadow-md footer bg-white/30'>
			<div className='flex justify-between align-middle w-[200px] mx-auto text-2xl mb-4 text-gray-400'>
				<a
					href='https://www.facebook.com/nifslk'
					target='_blank'
					rel='noreferrer'
					className='hover:text-sky-700'
				>
					<FaFacebookF />
				</a>

				<a
					href='https://twitter.com/nifslk'
					target='_blank'
					rel='noreferrer'
					className='hover:text-sky-700'
				>
					<FaInstagram />
				</a>

				<a
					href='https://www.instagram.com/nifs_lk/'
					target='_blank'
					rel='noreferrer'
					className='hover:text-sky-700'
				>
					<FaTwitter />
				</a>

				<a
					href='https://www.youtube.com/user/IFSweba'
					target='_blank'
					rel='noreferrer'
					className='hover:text-sky-700'
				>
					<FaYoutube />
				</a>

				<a
					href='https://www.linkedin.com/company/nifslk/'
					target='_blank'
					rel='noreferrer'
					className='hover:text-sky-700'
				>
					<FaLinkedinIn />
				</a>
			</div>

			<a
				className='text-sm text-center'
				href='https://www.nifs.ac.lk/'
				target='_blank'
				rel='noreferrer'
			>
				<p className='text-sky-700'>
					{' '}
					© National Institute of Fundamental Studies, Hantana Road, Kandy, Sri
					Lanka
				</p>
			</a>
		</div>
	);
}

export default Footer;
