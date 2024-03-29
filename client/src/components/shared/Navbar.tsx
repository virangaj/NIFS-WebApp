import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { HiMenuAlt2, HiOutlineBell } from 'react-icons/hi';
import Badge from '@mui/material/Badge';
import Logo from '../../images/nifs_logo.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Pages from '../data/MainNavPages.json';
import './navbar.css';
import OAuthService from '../../services/auth/OAuthService';

import { logout, reset } from '../../feature/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { RouteName } from '../../constant/routeNames';
import { toast } from 'react-toastify';
import { RequestStatus } from '../../constant/requestStatus';
import { UserStatus } from '../../constant/userStatus';

const Navbar = () => {
	// const [user, setUser] = useState<any>({});
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [employee, setEmployee] = useState<any>({});
	const { user, isLoading, isError, isSuccess, tokenExpireDate } =
		useAppSelector((state: any) => state.auth);

	// check user and send the login page
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

	//loginout funtion
	const logoutFunc = () => {
		dispatch(logout());
		dispatch(reset());
		toast.info('You are Successfully Logout!');
		navigate(RouteName.Login);
	};

	var settings = [
		{
			id: 0,
			title: 'Login',
			link: '/login',
		},
		{
			id: 0,
			title: 'Dashboard',
			link: `/dashboard/${user?.division}/${user?.role}`,
		},
	];

	// navbar function and variables
	const location: any = useLocation();

	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
		null
	);
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
		null
	);

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<AppBar position='fixed' className='main-navbar'>
			<Container maxWidth='xl'>
				<Toolbar disableGutters>
					{/*Responsive view start here  */}
					<Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
						<Link to='/'>
							<img src={Logo} alt='logo' className='nav-logo' />
						</Link>
					</Box>

					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size='large'
							aria-label='account of current user'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							onClick={handleOpenNavMenu}
							color='inherit'
						>
							<HiMenuAlt2 />
						</IconButton>
						<Menu
							id='menu-appbar'
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' },
							}}
						>
							{Pages &&
								Pages.map((page, index) =>
									location.pathname.split('/')[1] ===
									page.link.split('/')[1] ? (
										<Link
											to={page.link}
											style={{ textDecoration: 'none' }}
											key={index}
										>
											<Button
												onClick={handleCloseNavMenu}
												sx={{ my: 2, color: 'white', display: 'block' }}
												style={{
													backgroundColor: '#000',
													color: '#fff',
													fontWeight: 700,
												}}
											>
												{page.title}
											</Button>
										</Link>
									) : (
										<Link
											to={page.link}
											style={{ textDecoration: 'none' }}
											key={index}
										>
											<Button
												key={page.id}
												onClick={handleCloseNavMenu}
												sx={{ my: 2, color: 'white', display: 'block' }}
												style={{ backgroundColor: '#fff', color: '#000' }}
											>
												{page.title}
											</Button>
										</Link>
									)
								)}
						</Menu>
					</Box>

					{/* Responsive view ends here */}

					{/* Full width starts here */}
					<Box
						sx={{
							mr: 2,
							display: { xs: 'flex', md: 'none' },
							flexGrow: 1,
						}}
					>
						<Link to='/'>
							<img src={Logo} alt='logo' className='nav-logo' />
						</Link>
					</Box>

					<Box
						sx={{
							flexGrow: 1,
							display: { xs: 'none', md: 'flex' },
							justifyContent: 'space-around',
						}}
					>
						{Pages.map((page, index) =>
							location.pathname.split('/')[1] === page.link.split('/')[1] ? (
								<Link
									to={page.link}
									style={{ textDecoration: 'none' }}
									key={index}
								>
									<Button
										onClick={handleCloseNavMenu}
										sx={{ my: 2, color: 'white', display: 'block' }}
										style={{
											backgroundColor: '#fff',
											color: '#000',
											fontWeight: 700,
										}}
									>
										{page.title}
									</Button>
								</Link>
							) : (
								<Link
									to={page.link}
									style={{ textDecoration: 'none' }}
									key={index}
								>
									<Button
										key={page.id}
										onClick={handleCloseNavMenu}
										sx={{ my: 2, color: 'white', display: 'block' }}
									>
										{page.title}
									</Button>
								</Link>
							)
						)}
					</Box>
					<IconButton
						size='large'
						aria-label='show 17 new notifications'
						color='inherit'
						sx={{ mr: 2 }}
						onClick={() => {
							logoutFunc();
						}}
					>
						<Badge badgeContent={17} color='error'>
							<HiOutlineBell />
						</Badge>
					</IconButton>
					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title='Open settings'>
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: '45px' }}
							id='menu-appbar'
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							{settings &&
								settings.map((setting, index) => (
									<MenuItem key={index} onClick={handleCloseUserMenu}>
										{setting.title === 'Dashboard' ? (
											user?.role === UserStatus.ADMIN ? (
												<Link to={setting.link}>
													<Typography textAlign='center'>
														{setting.title}
													</Typography>
												</Link>
											) : (
												<></>
											)
										) : (
											<Link to={setting.link}>
												<Typography textAlign='center'>
													{setting.title}
												</Typography>
											</Link>
										)}
									</MenuItem>
								))}
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default Navbar;
