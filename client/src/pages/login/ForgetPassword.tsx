import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Ripple from '../../components/Ripple';
import InputFileds from '../../components/InputFileds';
import { toast } from 'react-toastify';
import OAuthService from '../../services/auth/OAuthService';
import { RequestStatus } from '../../constant/requestStatus';

function ForgetPassword() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [value, setValue] = useState({
		password: '',
		confirmPassword: '',
	});

	const [error, setError] = useState('');

	// onchange function
	const onChange = (e: any) => {
		setValue((preState) => ({
			...preState,
			[e.target.name]: e.target.value,
		}));
		setError('');
	};
	const onSubmit = async (e: any) => {
		e.preventDefault();
		setLoading(true);

		if (value.confirmPassword !== value.password) {
			setError('Password is not match, try again');
			toast.error('Password is not match, try again');
		}
		if (
			value.confirmPassword === value.password &&
			value.password.length <= 5
		) {
			setError('Password must contains at least 6 characters');
			toast.error('Password must contains at least 6 characters');
		} else {
			const data = {
				id: id,
				password: value.password,
			};
			console.log(data);
			await OAuthService.forgetPassword(data).then((res) => {
				if (res.data.status === RequestStatus.SUCCESS) {
					toast.info(res.data.message);
					navigate('/login');
				} else {
					toast.error(res.data.message);
				}
			});
		}
		setLoading(false);
	};
	return (
		<div className='absolute top-0 left-0 z-50 w-full h-full bg-gray-300/50 backdrop-blur-sm'>
			<div className='relative p-10 mx-auto bg-white rounded-lg modal-box top-72'>
				<div className='p-2 rounded-box bg-sky-200 w-[50px] h-[50px] mx-auto'>
					<img src='https://img.icons8.com/fluency/48/null/re-enter-pincode.png' />
				</div>
				<h1 className='text-center page-title'>Reset Your Password?</h1>
				<p className='mb-6 text-sm text-center text-gray-600'>
					Enter you new password here.
				</p>
				{!loading ? (
					<>
						<input
							id='outlined-basic'
							type='password'
							className='tailwind-text-box'
							onChange={onChange}
							value={value.password}
							name={'password'}
							required
							placeholder='Enter New Password'
						/>
						<input
							id='outlined-basic'
							type='password'
							className='tailwind-text-box'
							onChange={onChange}
							value={value.confirmPassword}
							name={'confirmPassword'}
							required
							placeholder='Confirm Password'
						/>

						{error ? <p className='error-text-message'>{error}</p> : <></>}

						<button
							className='w-full mt-5 btn btn-info rounded-xl'
							onClick={onSubmit}
						>
							Reset Password
						</button>
					</>
				) : (
					<Ripple />
				)}
			</div>
		</div>
	);
}

export default ForgetPassword;
