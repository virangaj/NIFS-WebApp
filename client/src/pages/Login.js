import React, { useState } from 'react';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Typography from '@mui/material/Typography';

import Logo from '../images/nifs_logo.png';

function Copyright(props) {
	return (
		<Typography
			variant="body2"
			color="text.secondary"
			align="center"
			{...props}
		>
			{'Copyright © '}
			<Link color="inherit" href="https://www.nifs.ac.lk/" target="_blank">
				National Institute of Fundamental Studies
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

export default function Login() {
	// defined form data
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const { email, password } = formData;

	// get form data as te update
	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		const userData = {
			email,
			password,
		};
		console.log(userData);
	};

	return (
		<Grid
			container
			position="absolute"
			component="main"
			sx={{ height: '100vh' }}
			className="body-content"
		>
			<CssBaseline />
			<Grid
				item
				xs={false}
				sm={4}
				md={7}
				sx={{
					backgroundImage:
						'url(https://www.nifs.ac.lk/themes/custom/nifslk/dist/img/students-large.jpg)',
					backgroundRepeat: 'no-repeat',
					backgroundColor: (t) =>
						t.palette.mode === 'light'
							? t.palette.grey[50]
							: t.palette.grey[900],
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
			/>
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				<Box
					sx={{
						my: 8,
						mx: 4,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Box sx={{ mr: 1 }}>
						<img src={Logo} alt="logo" className="login-logo" />
					</Box>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<Box
						component="form"
						noValidate
						onSubmit={handleSubmit}
						sx={{ mt: 1 }}
					>
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							value={email}
							autoComplete="email"
							autoFocus
							onChange={onChange}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							value={password}
							autoComplete="current-password"
							onChange={onChange}
						/>
						<FormControlLabel
							control={
								<Checkbox
									value="remember"
									color="primary"
									name="checked"
									id="chekccbox"
								/>
							}
							label="Remember me"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Sign In
						</Button>
						<Grid container>
							<Grid item xs>
								<Link to="#" variant="body2" className="pointer">
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link to="#" variant="body2" className="pointer">
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
						<Copyright sx={{ mt: 5 }} />
					</Box>
				</Box>
			</Grid>
		</Grid>
	);
}
