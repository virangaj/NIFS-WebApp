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
		<div className='fixed z-50 px-5 shadow-md navbar md:px-20 backdrop-blur-md bg-white/30'>
			<div className='navbar-start'>
				<div className='dropdown'>
					<label tabIndex={0} className='btn btn-ghost lg:hidden'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='w-5 h-5'
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
						className='p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52'
					>
						{Pages.map((page, index) =>
							location.pathname.split('/')[1] === page.link.split('/')[1] ? (
								<li
									className='font-bold text-gray-800 rounded-md bg-sky-300'
									key={index}
								>
									<Link to={page.link} style={{ textDecoration: 'none' }}>
										{page.title}
									</Link>
								</li>
							) : (
								<li key={index}>
									<Link to={page.link} style={{ textDecoration: 'none' }}>
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
			<div className='hidden navbar-center lg:flex'>
				<ul className='px-1 menu menu-horizontal'>
					{Pages.map((page, index) =>
						location.pathname.split('/')[1] === page.link.split('/')[1] ? (
							<li
								className='font-bold text-gray-800 rounded-md bg-sky-300'
								key={index}
							>
								<Link to={page.link} style={{ textDecoration: 'none' }}>
									{page.title}
								</Link>
							</li>
						) : (
							<li key={index}>
								<Link to={page.link} style={{ textDecoration: 'none' }}>
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
							<HiOutlineBell className='w-6 h-6' />

							<span className='badge badge-sm indicator-item'>8</span>
						</div>
					</label>
					<div
						tabIndex={0}
						className='mt-3 shadow card card-compact dropdown-content w-52 bg-base-100'
					>
						<div className='card-body'>
							<span className='text-lg font-bold'>8 Items</span>
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
						className='p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52'
					>
						<li>
							{user && user.user.role === UserStatus.ADMIN ? (
								<Link to={RouteName.AdminAdmin}>Dashboard</Link>
							) : (
								<></>
							)}
						</li>
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
