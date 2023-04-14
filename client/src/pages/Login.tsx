import { useForm, SubmitHandler } from 'react-hook-form';
import Link from '@mui/material/Link';

import Logo from '../images/nifs_logo.png';
import OAuthService from '../services/auth/OAuthService';
import { RequestStatus } from '../constant/requestStatus';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RouteName } from '../constant/routeNames';
import { useEffect, useState } from 'react';
import Ripple from '../components/Ripple';
import { login } from '../feature/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import LoginImage from '../images/login_image.png';

function Copyright(props: any) {
	return (
		<p className='mt-10 text-sm text-center'>
			{'Copyright © '}
			<Link color='inherit' href='https://www.nifs.ac.lk/' target='_blank'>
				National Institute of Fundamental Studies
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</p>
	);
}

export default function Login() {
	let navigate = useNavigate();
	const dispatch = useAppDispatch();

	const { auth } = useAppSelector((state) => state.persistedReducer);

	const [loading, setLoading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	//check user and redirect to home page
	useEffect(() => {
		if (auth?.user) {
			navigate(RouteName.Home);
		}
	}, [auth?.user]);

	const onSubmit: SubmitHandler<any> = (data) => {
		data.epfNo = parseInt(data.epfNo);

		setLoading(true);
		setTimeout(async () => {
			const result = await (await dispatch(login(data))).payload;
			console.log(result);
			// const result = await OAuthService.loginRequest(data);
			if (result.status === RequestStatus.CHANGE_PASSWORD) {
				navigate(RouteName.ChangePassword);
				toast.warning(result.message);
				setLoading(false);
				return;
			}
			if (result.status === RequestStatus.SUCCESS) {
				navigate(RouteName.Home);
				toast.success(result.message);
				setLoading(false);
				return;
			}
			if (result.status === RequestStatus.UNAUTHORIZED) {
				toast.error(result.message);
				setLoading(false);
				return;
			} else {
				toast.error('Please Enter Valid Credentials');
				setLoading(false);
				return;
			}
		}, 1000);

		console.log(data);
	};

	return (
		// <section className='flex flex-col items-center h-screen md:flex-row'>
		// 	<div className='hidden w-full h-screen bg-indigo-600 md:block md:w-1/2 xl:w-2/3'>
		// 		<img
		// 			src='https://source.unsplash.com/random'
		// 			alt='random'
		// 			className='object-cover w-full h-full'
		// 		/>
		// 	</div>

		// 	<div className='flex items-center justify-center w-full h-screen px-6 bg-white md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 lg:px-16 xl:px-12'>
		// 		<div className='w-full h-100'>
		// 			<img src={Logo} alt='logo' className='login-logo' />

		// 			<h1 className='mt-12 text-xl font-bold leading-tight md:text-2xl'>
		// 				Log in to your account
		// 			</h1>

		// 			{loading ? (
		// 				<>
		// 					<Ripple />
		// 				</>
		// 			) : (
		// 				<form className='mt-6' onSubmit={handleSubmit(onSubmit)}>
		// 					<div>
		// 						<label className='input-label'>EPF Number</label>
		// 						<input
		// 							type='text'
		// 							{...register('epfNo')}
		// 							placeholder='Enter EPF Number'
		// 							className='tailwind-text-box w-[100%]'
		// 							required
		// 						/>
		// 					</div>

		// 					<div className='mt-4'>
		// 						<label className='input-label'>Password</label>
		// 						<input
		// 							type='password'
		// 							{...register('password')}
		// 							placeholder='Enter Password'
		// 							className='tailwind-text-box w-[100%]'
		// 							required
		// 						/>
		// 					</div>

		// 					<button
		// 						type='submit'
		// 						className='block w-full px-4 py-3 mt-6 font-semibold text-white bg-indigo-500 rounded-lg hover:bg-indigo-400 focus:bg-indigo-400'
		// 					>
		// 						Log In
		// 					</button>
		// 				</form>
		// 			)}

		// 			<hr className='w-full my-6 border-gray-300' />

		// 			<Copyright />
		// 		</div>
		// 	</div>
		// </section>
		<div className='flex items-center h-screen p-6'>
			<div className='max-w-4xl mx-auto overflow-hidden bg-white shadow-xl rounded-box'>
				<div className='flex flex-col overflow-y-auto md:flex-row'>
					<div className='flex-1 h-32 md:h-auto md:w-1/2'>
						<img
							src={LoginImage}
							className='object-cover w-full h-full'
							alt='login'
						/>
					</div>
					<div className='flex-1 p-6 sm:p-12 md:w-1/2'>
						<img src={Logo} alt='logo' className='login-logo' />
						<p className='mt-2 text-sm text-center md:text-md text-sky-500'>
							National Institute of Fundamental Studies
						</p>

						<form className='mt-6' onSubmit={handleSubmit(onSubmit)}>
							<div className='w-full'>
								<input
									type='text'
									{...register('epfNo')}
									placeholder='Enter EPF Number'
									className='w-full mb-4 input rounded-xl input-bordered'
								/>
								<input
									type='password'
									{...register('password')}
									placeholder='Enter Password'
									className='w-full mb-4 input rounded-xl input-bordered'
								/>

								<button
									className='w-full mt-5 btn btn-info rounded-xl'
									type='submit'
								>
									Log in
								</button>

								<div className='mt-2 text-right'>
									<a
										href='#'
										className='text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700'
									>
										Forgot Password?
									</a>
								</div>
							</div>
						</form>
						<Copyright />
					</div>
				</div>
			</div>
		</div>
	);
}
