import * as React from 'react';
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
import { HiMenuAlt2, HiOutlineBell } from "react-icons/hi";
import Badge from '@mui/material/Badge';
import Logo from '../../images/nifs_logo.png'
import { Link, useLocation } from 'react-router-dom';
const pages = [
    {
        id: 0,
        title: 'Home',
        link: '/',
    },
    {
        id: 1,
        title: 'Common',
        link: '/common',
    },
    {
        id: 2,
        title: 'Account',
        link: '/account',
    },
    {
        id: 3,
        title: 'Admin',
        link: '/admin',
    },
    {
        id: 4,
        title: 'Library',
        link: '/library',
    },
    {
        id: 5,
        title: 'Procument',
        link: '/procument',
    },
    {
        id: 6,
        title: 'SEDU',
        link: '/sedu',
    },
    {
        id: 7,
        title: 'Transport',
        link: '/transport',
    },
    {
        id: 8,
        title: 'User Permission',
        link: '/user-permission',
    },
    // {
    //     id: 9,
    //     title: 'Notification',
    //     link: '/notification',
    // },
    {
        id: 10,
        title: 'Help',
        link: '/help',
    },
];
const settings = [
    {
        id: 0,
        title: 'Login',
        link: '/login',
    },
];
const Navbar = () => {

    const location: any = useLocation();
    console.log(location.pathname)


    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

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
        <AppBar position="fixed" className="main-navbar">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/*Responsive view start here  */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
                        <Link to='/'>
                            <img src={Logo} alt="logo" className="nav-logo" />
                        </Link>
                    </Box>


                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <HiMenuAlt2 />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
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
                            {pages && pages.map((page) => (
                                <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                                    <Link to={page.link} style={{ textDecoration: 'none' }}>
                                        <Typography textAlign="center">{page.title}</Typography>
                                    </Link>
                                </MenuItem>
                            ))}
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
                            <img src={Logo} alt="logo" className="nav-logo" />
                        </Link>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Link to={page.link} style={{ textDecoration: 'none' }} >
                                <Button
                                    key={page.id}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                    style={{ color: 'none' }}
                                >
                                    {page.title}
                                </Button>
                            </Link>
                        ))}
                    </Box>
                    <IconButton
                        size="large"
                        aria-label="show 17 new notifications"
                        color="inherit"
                        sx={{ mr: 2 }}
                    >
                        <Badge badgeContent={17} color="error">
                            <HiOutlineBell />
                        </Badge>
                    </IconButton>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
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
                            {settings && settings.map((setting) => (
                                <MenuItem key={setting.id} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting.title}</Typography>
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
