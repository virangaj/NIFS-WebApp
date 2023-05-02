import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Logo from '../../images/nifs_logo.png';
import OAuthService from '../../services/auth/OAuthService';
import ErrorMessage from '../../components/shared/ErrorMessage';
import { RequestStatus } from '../../constant/requestStatus';
import { RouteName } from '../../constant/routeNames';
import { useAppSelector } from '../../hooks/hooks';
import { useDispatch } from 'react-redux';
import { changePassword } from '../../feature/auth/authSlice';

function ChangePassword() {
	let navigate = useNavigate();
	let dispatch = useDispatch<any>();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	console.log(errors);

	//const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

	const [confirmError, setConfirmError] = useState('');
	const { auth } = useAppSelector((state) => state.persistedReducer);

	useEffect(() => {
		if (auth?.user === null) {
			navigate(RouteName.Login);
		}
	}, []);
	const onSubmit: SubmitHandler<any> = (data) => {
		//chaeck passwords match or not
		data.epfNo = parseInt(data.epfNo);
		// console.log(data);

		if (data.confirmPassword !== data.newPassword) {
			toast.error('Password is not match!');
			setConfirmError('Password is not match');
			return;
		} else {
			setConfirmError('');
			const reqData = {
				data: data,
				token: auth?.user?.token,
			};

			setTimeout(async () => {
				const result = await dispatch(changePassword(reqData));
				if (result?.status === RequestStatus.SUCCESS) {
					//redirect to login page
					toast.success(result?.message);
					localStorage.removeItem('persist:employee');

					navigate(RouteName.Login);
				} else {
					toast.error(result.message);
				}
			}, 1000);
		}
	};
	return (
		<div className='h-screen'>
			<div className='w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%] h-auto p-6 my-20 bg-white mx-auto rounded-lg'>
				<img src={Logo} alt='logo' className='login-logo' />
				<p className='mt-2 text-sm text-center md:text-md text-sky-500'>
					National Institute of Fundamental Studies
				</p>

				<h1 className='mt-12 text-xl font-bold leading-tight text-center md:text-2xl'>
					Change your Password here.
				</h1>

				<form className='mt-6' onSubmit={handleSubmit(onSubmit)}>
					<div>
						<label className='input-label'>EPF Number</label>
						<input
							type='text'
							{...register('epfNo')}
							placeholder='Enter EPF Number'
							className='tailwind-text-box'
							required
						/>
					</div>

					<div className='mt-4'>
						<label className='input-label'>Old Password</label>
						<input
							type='password'
							{...register('oldPassword')}
							placeholder='Enter Password'
							className='tailwind-text-box'
							required
						/>
					</div>
					<div className='mt-4'>
						<label className='input-label'>New Password</label>
						<input
							type='password'
							{...register('newPassword', {
								minLength: {
									value: 6,
									message: 'Password should contains more than 6 characters',
								},
							})}
							placeholder='Enter Password'
							className='tailwind-text-box'
							required
						/>
						{errors.newPassword?.type === 'minLength' && (
							<ErrorMessage
								msg={'Password should contains more than 6 characters'}
							/>
						)}
					</div>

					<div className='mt-4'>
						<label className='input-label'>ReEnter New Password</label>
						<input
							type='password'
							{...register('confirmPassword')}
							placeholder='ReEnter Password'
							className='tailwind-text-box'
							required
						/>
						{confirmError && <ErrorMessage msg={confirmError} />}
					</div>
					<button className='w-full mt-5 btn btn-info rounded-xl' type='submit'>
						Change Password
					</button>
				</form>
			</div>
		</div>
	);
}

export default ChangePassword;
