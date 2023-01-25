import React, { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import IVenueMaster from '../../types/IVenueMaster';
import Autocomplete from '@mui/material/Autocomplete';

import IParticipantMaster from '../../types/IParticipantMaster';
import CustomeDataPicker from '../../components/DataPicker';
import ParticipantMasterService from '../../services/sedu/ParticipantMasterService';
import Ripple from '../../components/Ripple';

function ParticipantMaster() {
	const [participantCode, setParticipantsCode] = useState('');
	const [date, setDate] = React.useState<string | null>(null);

	const [loading, setLoading] = useState(false);

	const [values, setValues] = useState<IParticipantMaster>({
		pCode: '',
		date: '',
		pName: '',
		nic: '',
		gender: '',
		address: '',
		contactNo: '',
		email: '',
		instituteName: '',
	});

	const onChange = (e: any) => {
		setValues((preState) => ({
			...preState,
			[e.target.name]: e.target.value,
		}));
	};

	useEffect(() => {
		setValues({
			pCode: participantCode ? participantCode : '',
			date: date ? date : '',
			pName: values?.pName,
			nic: values?.nic,
			gender: values?.gender,
			address: values?.address,
			contactNo: values?.contactNo,
			email: values?.email,
			instituteName: values?.instituteName,
		});
	}, [participantCode, date]);

	const resetForm = () => {
		setValues({
			pCode: '',
			date: '',
			pName: '',
			nic: '',
			gender: '',
			address: '',
			contactNo: '',
			email: '',
			instituteName: '',
		});
	};
	const onSubmit = async (e: any) => {
		e.preventDefault();

		try {
			setLoading(true);
			// const result = await ParticipantMasterService.saveParticipant(values);
			alert('done');
		} catch (e: any) {
			setLoading(true);
			alert(e);
		}
		setLoading(false);

		console.log(values);
	};
	console.log(date);
	const participants = [
		{ label: 'The Shawshank Redemption', year: 1994 },
		{ label: 'The Godfather', year: 1972 },
		{ label: 'The Godfather: Part II', year: 1974 },
		{ label: 'The Dark Knight', year: 2008 },
		{ label: '12 Angry Men', year: 1957 },
		{ label: "Schindler's List", year: 1993 },
		{ label: 'Pulp Fiction', year: 1994 },
	];
	return (
		<div className='sub-body-content lg:!w-[60%]'>
			<h1 className='page-title'>Participant Master</h1>
			<hr className='horizontal-line' />

			{!loading ? (
				<form onSubmit={onSubmit} className='w-[90%] mx-auto'>
					<div className='form-flex'>
						<Box className='input-field lg:mr-10 mx-0 !lg:w-[60%] w-[100%]'>
							<Autocomplete
								disablePortal
								id='combo-box-demo'
								options={participants}
								isOptionEqualToValue={(option: any) => option.label}
								onChange={(event, value: any) => {
									setParticipantsCode(value.label);
								}}
								renderInput={(params) => (
									<TextField
										{...params}
										fullWidth
										required
										label='Participant Code'
										name='participant'
										value={participantCode}
									/>
								)}
							/>
						</Box>

						<CustomeDataPicker
							date={date}
							setDate={setDate}
							title='Date'
							className='mx-0 lg:ml-10'
						/>
					</div>

					<div className='mb-4'>
						<label className='input-label' htmlFor='pName'>
							Participant Name
						</label>

						<input
							id='pName'
							type='text'
							className='tailwind-text-box '
							onChange={onChange}
							name='pName'
							value={values.pName}
							required
						/>
					</div>

					<div className='grid grid-cols-1 gap-10 md:grid-cols-2 place-content-between'>
						<div className='mb-4'>
							<label className='input-label' htmlFor='nic'>
								NIC
							</label>

							<input
								id='nic'
								type='text'
								className='tailwind-text-box '
								onChange={onChange}
								name='nic'
								value={values.nic}
								required
							/>
						</div>

						<div className='mb-4'>
							<label className='input-label' htmlFor='gender'>
								Gender
							</label>
							<select
								className='tailwind-text-box '
								value={values.gender}
								name='gender'
								id='gender'
								onChange={onChange}
							>
								<option value='' disabled>
									Select Gender
								</option>
								<option value='male'>Male</option>
								<option value='female'>Female</option>
							</select>
						</div>
					</div>

					<div className='mb-4'>
						<label className='input-label' htmlFor='address'>
							Address
						</label>

						<input
							id='address'
							type='text'
							className='tailwind-text-box '
							onChange={onChange}
							name='address'
							value={values.address}
							required
						/>
					</div>
					<div className='grid grid-cols-1 gap-10 md:grid-cols-2'>
						<div className='mb-4'>
							<label className='input-label' htmlFor='contactNo'>
								Contact Number
							</label>

							<input
								id='contactNo'
								type='text'
								className='tailwind-text-box '
								onChange={onChange}
								name='contactNo'
								value={values.contactNo}
								required
							/>
						</div>

						<div className='mb-4'>
							<label className='input-label' htmlFor='email'>
								Email
							</label>

							<input
								id='email'
								type='email'
								className='tailwind-text-box '
								onChange={onChange}
								name='email'
								value={values.email}
								required
							/>
						</div>
					</div>

					<div className='mb-4'>
						<label className='input-label' htmlFor='instituteName'>
							Institute Name
						</label>

						<input
							id='instituteName'
							type='instituteName'
							className='tailwind-text-box '
							onChange={onChange}
							name='instituteName'
							value={values.instituteName}
							required
						/>
					</div>

					<Stack
						direction='row'
						justifyContent='flex-end'
						alignItems='flex-end'
						spacing={2}
						className='admin-form-buton-stack'
					>
						<button
							className='action-com-model-error-btn'
							type='reset'
							color='error'
							onClick={resetForm}
						>
							Reset
						</button>
						<button className='action-com-model-sucess-btn' type='submit'>
							Submit
						</button>
					</Stack>
				</form>
			) : (
				<Ripple />
			)}
		</div>
	);
}

export default ParticipantMaster;
