import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import SelectFacility from './shared/SelectFacility';
import SetChargers from './shared/SetChargers';
import VenueMasterService from '../../services/sedu/VenueMasterService';
import IVenueMaster from '../../types/sedu/IVenueMaster';
import Ripple from '../../components/Ripple';
import { generateID } from '../../utils/generateId';

import VenueOtherService from '../../services/sedu/VenueOtherService';
import LocationMasterService from '../../services/admin/LocationMasterService';
import ILocationData from '../../types/ILocationData';

import '../pages.css';
import LocationSelector from '../../components/shared/LocationSelector';
import { useAppSelector } from '../../hooks/hooks';

const initialState: IVenueMaster = {
	venueId: '',
	venueName: '',
	type: '',
	availability: '',
	location: '',
	remark: '',
	capacity: 0,
	dateCreated: '',
	charges: [],
	facilities: [],
};

function VenueMaster() {
	const [facilities, setFacilities] = useState<any[]>([]);
	const [chargers, setChargers] = useState<any[]>([]);
	const [locationData, setLocationData] = useState<ILocationData[]>();
	const [loading, setLoading] = useState(false);
	const [v_id, setV_Id] = useState('');
	const [success, setSuccess] = useState(false);
	const [values, setValues] = useState<IVenueMaster>(initialState);

	const { auth } = useAppSelector((state) => state.persistedReducer);

	// onchange function
	const onChange = (e: any) => {
		setValues((preState) => ({
			...preState,
			[e.target.name]: e.target.value,
		}));
	};
	useEffect(() => {
		setValues({
			...values,
			venueId: v_id,
		});
	}, [v_id]);

	useEffect(() => {
		setValues({
			...values,
			charges: chargers.map((c) => c.chargeId),
		});
	}, [chargers]);
	useEffect(() => {
		setValues({
			...values,
			facilities: facilities.map((c) => c.facilityId),
		});
	}, [facilities]);

	// generate id on button click
	const generateVenueID = () => {
		resetForm();
		VenueMasterService.getNewVenueId()
			.then((res: any) => {
				setV_Id(res.data);
			})
			.catch((e: any) => {
				console.log(e);
			});
	};

	const resetForm = () => {
		setValues(initialState);
		setV_Id('');
		setFacilities([]);
		setChargers([]);
	};

	const onSubmit = async (e: any) => {
		e.preventDefault();

		if (values.venueId !== null) {
			try {
				setLoading(true);
				console.log(values);
				// const venuResult = await VenueMasterService.saveVenue(
				// 	values,
				// 	auth?.user?.token
				// );

				setSuccess(true);
				resetForm();
			} catch (e: any) {
				setLoading(true);
				setSuccess(false);
				alert(e);
			}

			if (success) {
				resetForm();
			}
			setLoading(false);
		} else {
			alert('Please add a ID');
		}
		// console.log(values)
	};

	return (
		<div className='sub-body-content xl:!w-[60%]'>
			<h1 className='page-title'>Venue Master</h1>
			<hr className='horizontal-line' />

			{!loading ? (
				<form onSubmit={onSubmit}>
					<Box className='flex items-center input-field'>
						<p>Venue Id - {v_id ? v_id : ''}</p>

						<button
							type='button'
							className='rounded-outline-success-btn'
							onClick={generateVenueID}
							style={{ marginLeft: '20px' }}
						>
							New
						</button>
					</Box>
					<div className='grid grid-cols-1 md:grid-cols-2'>
						<div className='form-left-section'>
							<div>
								<label className='input-label' htmlFor='venueName'>
									Venue Name
								</label>

								<input
									id='outlined-basic'
									type='search'
									className='mr-4 tailwind-text-box w-[90%]'
									onChange={onChange}
									name='venueName'
									value={values.venueName}
									required
								/>
							</div>
							<div>
								<label className='input-label' htmlFor='type'>
									Venue Type
								</label>
								<select
									className='tailwind-text-box w-[90%]'
									value={values.type}
									id='outlined-basic'
									name='type'
									onChange={onChange}
								>
									<option value='' disabled>
										Select Venue Type
									</option>
									<option value='Room'>Room</option>
									<option value='Lab'>Lab</option>
									<option value='Auditorium'>Auditorium</option>
								</select>
							</div>

							<SelectFacility
								setFacilities={setFacilities}
								facilities={facilities}
							/>

							<div>
								<label className='input-label' htmlFor='availability'>
									Availability
								</label>

								<input
									id='outlined-basic'
									type='search'
									className='mr-4 tailwind-text-box w-[90%]'
									onChange={onChange}
									name='availability'
									value={values.availability}
									required
								/>
							</div>
						</div>

						{/* form right section */}
						<div className='form-right-section'>
							<LocationSelector
								onChange={onChange}
								value={values.location}
								name='location'
							/>

							<div>
								<label className='input-label' htmlFor='remark'>
									Capacity
								</label>

								<input
									id='outlined-basic'
									type='search'
									className='mr-4 tailwind-text-box w-[90%]'
									onChange={onChange}
									name='capacity'
									value={values.capacity}
									required
								/>
							</div>

							<SetChargers chargers={chargers} setChargers={setChargers} />
							<div>
								<label className='input-label' htmlFor='remark'>
									Remark
								</label>

								<input
									id='outlined-basic'
									type='search'
									className='mr-4 tailwind-text-box w-[90%]'
									onChange={onChange}
									name='remark'
									value={values.remark}
									required
								/>
							</div>
						</div>
					</div>
					{/* button stack */}
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

export default VenueMaster;
