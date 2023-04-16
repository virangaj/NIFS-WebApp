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
import ForgetPasswordPopUp from '../components/ForgetPasswordPopUp';

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
	const [popup, setPopUp] = useState(false);
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
			const result = await dispatch(login(data));
			console.log(result);

			// const result = await OAuthService.loginRequest(data);
			if (result?.payload?.status === RequestStatus.CHANGE_PASSWORD) {
				navigate(RouteName.ChangePassword);
				toast.warning(result?.payload?.message);
				setLoading(false);
			}
			if (result?.payload?.status === RequestStatus.SUCCESS) {
				navigate(RouteName.Home);
				toast.success(result?.payload?.message);
				setLoading(false);
			}
			if (result?.payload?.status === RequestStatus.UNAUTHORIZED) {
				toast.error(result?.payload?.message);
				setLoading(false);
			}
			if (result?.payload === undefined) {
				toast.error('Please Enter valied Credentials!');
				setLoading(false);
			}
		}, 1000);

		console.log(data);
	};

	return (
		<>
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
										<p
											className='text-sm font-semibold text-gray-700 cursor-pointer hover:text-blue-700 focus:text-blue-700'
											onClick={() => setPopUp((val) => !val)}
										>
											Forgot Password?
										</p>
									</div>
								</div>
							</form>
							<Copyright />
						</div>
					</div>
				</div>
			</div>
			{popup ? <ForgetPasswordPopUp setPopUp={setPopUp} /> : <></>}
		</>
	);
}
