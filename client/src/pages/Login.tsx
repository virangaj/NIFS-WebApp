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
import { useAppDispatch, useAppSelector } from '../redux/hooks';

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

	const { user, isLoading, isError, isSuccess, message } = useAppSelector(
		(state: any) => state.auth
	);

	const [loading, setLoading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	//check user and redirect to home page
	useEffect(() => {
		if (user) {
			navigate(RouteName.Home);
		}
	}, [user]);

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
		<section className='flex flex-col items-center h-screen md:flex-row'>
			<div className='hidden w-full h-screen bg-indigo-600 md:block md:w-1/2 xl:w-2/3'>
				<img
					src='https://source.unsplash.com/random'
					alt=''
					className='object-cover w-full h-full'
				/>
			</div>

			<div className='flex items-center justify-center w-full h-screen px-6 bg-white md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 lg:px-16 xl:px-12'>
				<div className='w-full h-100'>
					<img src={Logo} alt='logo' className='login-logo' />
					<p className='mt-2 text-sm text-center md:text-md text-sky-500'>
						National Institute of Fundamental Studies
					</p>

					<h1 className='mt-12 text-xl font-bold leading-tight md:text-2xl'>
						Log in to your account
					</h1>

					{loading ? (
						<>
							<Ripple />
						</>
					) : (
						<form className='mt-6' onSubmit={handleSubmit(onSubmit)}>
							<div>
								<label className='input-label'>EPF Number</label>
								<input
									type='text'
									{...register('epfNo')}
									placeholder='Enter EPF Number'
									className='tailwind-text-box w-[100%]'
									required
								/>
							</div>

							<div className='mt-4'>
								<label className='input-label'>Password</label>
								<input
									type='password'
									{...register('password')}
									placeholder='Enter Password'
									className='tailwind-text-box w-[100%]'
									required
								/>
							</div>

							<div className='mt-2 text-right'>
								<a
									href='#'
									className='text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700'
								>
									Forgot Password?
								</a>
							</div>

							<button
								type='submit'
								className='block w-full px-4 py-3 mt-6 font-semibold text-white bg-indigo-500 rounded-lg hover:bg-indigo-400 focus:bg-indigo-400'
							>
								Log In
							</button>
						</form>
					)}

					<hr className='w-full my-6 border-gray-300' />

					<button
						type='button'
						className='block w-full px-4 py-3 font-semibold text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:bg-sky-100'
					>
						<div className='flex items-center justify-center'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								xmlnsXlink='http://www.w3.org/1999/xlink'
								className='w-6 h-6'
								viewBox='0 0 48 48'
							>
								<defs>
									<path
										id='a'
										d='M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z'
									/>
								</defs>
								<clipPath id='b'>
									<use xlinkHref='#a' overflow='visible' />
								</clipPath>
								<path clipPath='url(#b)' fill='#FBBC05' d='M0 37V11l17 13z' />
								<path
									clipPath='url(#b)'
									fill='#EA4335'
									d='M0 11l17 13 7-6.1L48 14V0H0z'
								/>
								<path
									clipPath='url(#b)'
									fill='#34A853'
									d='M0 37l30-23 7.9 1L48 0v48H0z'
								/>
								<path
									clipPath='url(#b)'
									fill='#4285F4'
									d='M48 48L17 24l-4-3 35-10z'
								/>
							</svg>
							<span className='ml-4'>Log in with Google</span>
						</div>
					</button>

					<Copyright />
				</div>
			</div>
		</section>
	);
}
