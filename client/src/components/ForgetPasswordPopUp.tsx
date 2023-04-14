import React, { useState } from 'react';
import { HiX } from 'react-icons/hi';
import InputFileds from './InputFileds';
import OAuthService from '../services/auth/OAuthService';
import { toast } from 'react-toastify';
import { RequestStatus } from '../constant/requestStatus';
import Ripple from './Ripple';

function ForgetPasswordPopUp({ setPopUp }: any) {
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState({
		email: '',
	});
	// onchange function
	const onChange = (e: any) => {
		setEmail((preState) => ({
			...preState,
			[e.target.name]: e.target.value,
		}));
	};
	const onSubmit = async (e: any) => {
		e.preventDefault();
		setLoading(true);
		await OAuthService.forgetPassword(email.email).then((res) => {
			console.log(res);
			if (res.data.status === RequestStatus.SUCCESS) {
				toast.info(res.data.message);
			} else {
				toast.error(res.data.message);
			}
		});
		setLoading(false);
	};
	return (
		<>
			<div className='absolute top-0 left-0 z-50 w-full h-full bg-gray-300/50 backdrop-blur-sm'>
				<div className='relative p-10 mx-auto bg-white rounded-lg modal-box top-72'>
					<label
						htmlFor='my-modal-3'
						onClick={() => {
							setPopUp((val: boolean) => !val);
						}}
						className='absolute btn btn-sm btn-circle right-2 top-2 btn-info'
					>
						<HiX />
					</label>
					<div className='p-2 rounded-box bg-sky-200 w-[50px] h-[50px] mx-auto'>
						<img src='https://img.icons8.com/fluency/48/null/password--v2.png' />
					</div>
					<h1 className='page-title text-center'>Forget Password?</h1>
					<p className='mb-6 text-sm text-gray-600 text-center'>
						Enter email address associated
						<br /> with your account
					</p>
					{!loading ? (
						<>
							<InputFileds
								onChange={onChange}
								value={email.email}
								name={'email'}
								label=''
							/>
							<button
								className='w-full mt-5 btn btn-info rounded-xl'
								onClick={onSubmit}
							>
								Log in
							</button>
						</>
					) : (
						<Ripple />
					)}
				</div>
			</div>
		</>
	);
}

export default ForgetPasswordPopUp;
