import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import IVenueMaster from '../../types/sedu/IVenueMaster';
import Autocomplete from '@mui/material/Autocomplete';

import IParticipantMaster from '../../types/sedu/IParticipantMaster';
import CustomeDataPicker from '../../components/DataPicker';
import ParticipantMasterService from '../../services/sedu/ParticipantMasterService';
import Ripple from '../../components/Ripple';
import ImportFromXlsx from '../../components/ImportFromXlsx';
import EventSelector from '../../components/shared/EventSelector';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../hooks/hooks';
import { generateID } from '../../utils/generateId';
import { Link } from 'react-router-dom';
import { RouteName } from '../../constant/routeNames';

const initialState: IParticipantMaster = {
	eventId: '',
	participantId: '',
	name: '',
	nic: '',
	gender: '',
	address: '',
	contactNo: '',
	email: '',
	institute: '',
};

function ParticipantMaster() {
	const [participantCode, setParticipantsCode] = useState('');
	const [loading, setLoading] = useState(false);
	const [values, setValues] = useState<IParticipantMaster>(initialState);
	const { auth } = useAppSelector((state) => state.persistedReducer);

	const [p_id, setP_id] = useState<String | any>('');
	const onChange = (e: any) => {
		setValues((preState) => ({
			...preState,
			[e.target.name]: e.target.value,
		}));
	};
	useEffect(() => {
		generateEventId();
		// console.log('trigger ' + p_id);
		setValues({
			...values,
			participantId: p_id,
		});
	}, [values.name]);

	const generateEventId = () => {
		setP_id(generateID('PM'));
	};
	const resetForm = () => {
		setValues(initialState);
	};
	const onSingleSubmit = async (e: any) => {
		e.preventDefault();
		setValues({
			...values,
			participantId: p_id,
		});

		setLoading(true);
		await ParticipantMasterService.saveParticipant(values, auth?.user?.token)
			.then((res) => {
				if (res.data) {
					toast.success('Participant Added!');
					resetForm();
				}
			})
			.catch((e: any) => {
				toast.error('Requset cannot be Completed!');
			});

		setLoading(false);

		console.log(values);
	};

	return (
		<div className='sub-body-content lg:!w-[60%]'>
			<h1 className='page-title'>Participant Master</h1>
			<hr className='horizontal-line' />

			{!loading ? (
				<form onSubmit={onSingleSubmit} className='w-[90%] mx-auto'>
					<EventSelector
						onChange={onChange}
						name='eventId'
						value={values.eventId}
					/>

					<div className='mb-4'>
						<label className='input-label' htmlFor='name'>
							Participant Name
						</label>

						<input
							id='name'
							type='text'
							className='tailwind-text-box '
							onChange={onChange}
							name='name'
							value={values.name}
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
						<label className='input-label' htmlFor='institute'>
							Institute Name
						</label>

						<input
							id='institute'
							type='institute'
							className='tailwind-text-box '
							onChange={onChange}
							name='institute'
							value={values.institute}
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
						<Link to={RouteName.ImportFromExcel}>
							<button className='action-com-model-sucess-btn'>
								Import from Excel
							</button>
						</Link>
					</Stack>
				</form>
			) : (
				<Ripple />
			)}
		</div>
	);
}

export default ParticipantMaster;
