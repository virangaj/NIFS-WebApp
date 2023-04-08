import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../hooks/hooks';
import { HiX } from 'react-icons/hi';
import { Stack } from '@mui/material';
import Ripple from '../../../../components/Ripple';
import VenueOtherService from '../../../../services/sedu/VenueOtherService';
import { toast } from 'react-toastify';
import { RequestStatus } from '../../../../constant/requestStatus';

function CreateFacility() {
	const [f_id, setF_Id] = useState('');
	const [loading, setLoading] = useState(false);
	const { auth } = useAppSelector((state) => state.persistedReducer);

	const [values, setValues] = useState<any>({
		facilityId: '',
		name: '',
	});
	const onChange = (e: any) => {
		setValues((preState: any) => ({
			...preState,
			[e.target.name]: e.target.value,
		}));
	};
	useEffect(() => {
		setValues({
			...values,
			facilityId: f_id,
		});
	}, [f_id]);
	const generateVenueID = () => {
		VenueOtherService.getNewFacilityId()
			.then((res: any) => {
				setF_Id(res.data);
			})
			.catch((e: any) => {
				console.log(e);
			});
	};
	const resetForm = () => {
		setValues({
			facilityId: '',
			name: '',
		});
		setF_Id('');
	};
	const onSubmit = async (e: any) => {
		e.preventDefault();
		console.log(values);
		if (!values.facilityId || !values.name) {
			toast.error('Please fill up the fields');
			return;
		}

		setLoading(true);
		VenueOtherService.saveFacility(values, auth?.user.token)
			.then((res) => {
				if (res.facilityId != null) {
					toast.success('New charge has been created!');
				} else {
					toast.error('Request cannot be completed');
				}
			})
			.catch((e) => {
				toast.error('Request cannot be completed');
			});
		setLoading(false);
	};
	return (
		<>
			{!loading ? (
				<form onSubmit={onSubmit} className='admin-form'>
					<div className='generate-id-in-form'>
						<p className='flex items-center'>
							Facility Id -{' '}
							{f_id ? (
								<>
									{f_id}
									<HiX
										className='text-xl cursor-pointer hover:text-red-600'
										onClick={() => setF_Id('')}
									/>
								</>
							) : (
								''
							)}
						</p>
						<button
							type='button'
							className='rounded-outline-success-btn'
							onClick={generateVenueID}
							style={{ marginLeft: '20px' }}
						>
							New
						</button>
					</div>

					<div>
						<label className='input-label' htmlFor='typeName'>
							Name
						</label>
						<input
							id='typeName'
							type='text'
							className='tailwind-text-box'
							onChange={onChange}
							name='name'
							value={values.name}
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
		</>
	);
}

export default CreateFacility;
