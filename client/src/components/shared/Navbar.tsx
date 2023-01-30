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
import { Link, useLocation } from 'react-router-dom';
import Pages from '../data/MainNavPages.json';
import './navbar.css';
import OAuthService from '../../services/auth/OAuthService';

const Navbar = () => {
	const [user, setUser] = useState<any>({});

	const [employee, setEmployee] = useState<any>({});

	useEffect(() => {
		localStorage.setItem(
			'loginUser',
			JSON.stringify({
				name: 'Viranga',
				epfNo: 456,
				division: 'admin',
				role: 'admin',
			})
		);

		const storeData = window.localStorage.getItem('loginUser');

		if (storeData) {
			setUser(JSON.parse(storeData));
		}
	}, []);

	// check valid token
	useEffect(() => {
		const localEmployee = localStorage.getItem('employee');

		if (localEmployee) {
			setEmployee(JSON.parse(localEmployee));
			// const inValidToken = new Date().getTime() > employee.expireDate;

			// if (inValidToken) {
			// 	localStorage.removeItem('employee');
			// }
		}
	}, []);

	const settings = [
		{
			id: 0,
			title: 'Login',
			link: '/login',
		},
		{
			id: 0,
			title: 'Dashboard',
			link: `/dashboard/${user.division}/${user.role}`,
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
							OAuthService.logout();
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
											user.role === 'admin' ? (
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
