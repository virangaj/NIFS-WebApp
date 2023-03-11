import React, { useEffect, useState } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiOutlineBell } from 'react-icons/hi';
import { logout, reset } from '../../feature/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { RouteName } from '../../constant/routeNames';
import { toast } from 'react-toastify';
import { RequestStatus } from '../../constant/requestStatus';
import { UserStatus } from '../../constant/userStatus';
import OAuthService from '../../services/auth/OAuthService';
import Logo from '../../images/nifs_logo.png';
import Pages from '../data/MainNavPages.json';

import './navbar.css';

function TailwindNavbar() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [employee, setEmployee] = useState<any>({});
	const { user, isLoading, isError, isSuccess, tokenExpireDate } =
		useAppSelector((state: any) => state.auth);
	// navbar function and variables
	const location: any = useLocation();
	useEffect(() => {
		if (user === null) {
			navigate(RouteName.Login);
		}

		if (tokenExpireDate && new Date().getDate() > tokenExpireDate) {
			dispatch(logout());
			dispatch(reset());
			toast.error('System timeout ERROR! Please login to the system..!');
			navigate(RouteName.Login);
		}
		if (user?.status === RequestStatus.CHANGE_PASSWORD) {
			navigate(RouteName.ChangePassword);
		}
	}, [user, isLoading, isError, isSuccess, tokenExpireDate]);

	const logoutFunc = () => {
		dispatch(logout());
		dispatch(reset());
		toast.info('You are Successfully Logout!');
		navigate(RouteName.Login);
	};

	return (
		<div className='navbar px-5 md:px-20 shadow-md fixed z-50 backdrop-blur-md bg-white/30'>
			<div className='navbar-start'>
				<div className='dropdown'>
					<label tabIndex={0} className='btn btn-ghost lg:hidden'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-5 w-5'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M4 6h16M4 12h8m-8 6h16'
							/>
						</svg>
					</label>
					<ul
						tabIndex={0}
						className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52'
					>
						{Pages.map((page, index) =>
							location.pathname.split('/')[1] === page.link.split('/')[1] ? (
								<li className='bg-sky-300 font-bold text-gray-800 rounded-md'>
									<Link
										to={page.link}
										style={{ textDecoration: 'none' }}
										key={index}
									>
										{page.title}
									</Link>
								</li>
							) : (
								<li>
									<Link
										to={page.link}
										style={{ textDecoration: 'none' }}
										key={index}
									>
										{page.title}
									</Link>
								</li>
							)
						)}
					</ul>
				</div>
				<Link to='/'>
					<img src={Logo} alt='logo' className='nav-logo' />
				</Link>
			</div>
			<div className='navbar-center hidden lg:flex'>
				<ul className='menu menu-horizontal px-1'>
					{Pages.map((page, index) =>
						location.pathname.split('/')[1] === page.link.split('/')[1] ? (
							<li className='bg-sky-300 font-bold text-gray-800 rounded-md'>
								<Link
									to={page.link}
									style={{ textDecoration: 'none' }}
									key={index}
								>
									{page.title}
								</Link>
							</li>
						) : (
							<li>
								<Link
									to={page.link}
									style={{ textDecoration: 'none' }}
									key={index}
								>
									{page.title}
								</Link>
							</li>
						)
					)}
				</ul>
			</div>
			<div className='navbar-end'>
				<div className='dropdown dropdown-end'>
					<label tabIndex={0} className='btn btn-ghost btn-circle'>
						<div className='indicator'>
							<HiOutlineBell className='h-6 w-6' />

							<span className='badge badge-sm indicator-item'>8</span>
						</div>
					</label>
					<div
						tabIndex={0}
						className='mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow'
					>
						<div className='card-body'>
							<span className='font-bold text-lg'>8 Items</span>
							<span className='text-info'>Subtotal: $999</span>
							<div className='card-actions'>
								<button className='btn btn-primary btn-block'>View cart</button>
							</div>
						</div>
					</div>
				</div>
				<div className='dropdown dropdown-end'>
					<label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
						<div className='avatar'>
							<div className='w-10 rounded-full'>
								<img src='https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80' />
							</div>
						</div>
					</label>
					<ul
						tabIndex={0}
						className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52'
					>
						<li>
							<a className='justify-between'>
								Profile
								<span className='badge'>New</span>
							</a>
						</li>
						{/* <li>
							<a>Settings</a>
						</li> */}
						<li>
							{user ? (
								<a onClick={logoutFunc}>Logout</a>
							) : (
								<Link to={RouteName.Login}>Login</Link>
							)}
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default TailwindNavbar;
