import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import { generateID } from '../../utils/generateId';
import CustomeDataPicker from '../../components/DataPicker';

import CustomeTimePicker from '../../components/TimePicker';
import FileInput from '../../components/FileInput';
import EventRequestParticipants from './shared/EventRequestParticipants';

import IEventRequest from '../../types/sedu/IEventRequest';
import LocationSelector from '../../components/shared/LocationSelector';
import ProjectSelector from '../../components/shared/ProjectSelector';
import FundingSourceSelector from '../../components/shared/FundingSourceSelector';
import VenueSelector from '../../components/shared/VenueSelector';
import TextBoxLabel from '../../components/shared/TextBoxLabel';
import EventRequestService from '../../services/sedu/EventRequestService';
import { useAppSelector } from '../../hooks/hooks';
import { toast } from 'react-toastify';

const initialState: IEventRequest = {
	documentNo: '',
	eventType: '',
	title: '',
	remark: '',
	startDate: '',
	endDate: '',
	startTime: '',
	endTime: '',
	noParticipants: 0,
	budget: 0,
	projectId: '',
	locationId: '',
	venueId: '',
	fundingId: '',
};

function EventRequest() {
	const [startDate, setStartDate] = useState<string | null>(null);
	const [startTime, setStartTime] = useState<string | null>(null);

	const [endDate, setEndDate] = useState<string | null>(null);
	const [endTime, setEndTime] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [getEventId, setEventId] = useState<String | any>('');

	const [totalParticipants, setTotalParticipants] = useState([]);

	const [eventAttachment, setEventAttachment] = useState<File | any>();

	const [values, setValues] = useState<IEventRequest>(initialState);
	const { auth } = useAppSelector((state) => state.persistedReducer);
	useEffect(() => {
		setValues({
			...values,
			documentNo: getEventId,
			startDate: startDate ? startDate : '',
			endDate: endDate ? endDate : '',
			startTime: startTime ? startTime : '',
			endTime: endTime ? endTime : '',
		});
	}, [startDate, endDate, startTime, endTime, getEventId]);

	const generateEventId = () => {
		setEventId(generateID('ER'));
	};

	const onChange = (e: any) => {
		setValues((preState) => ({
			...preState,
			[e.target.name]: e.target.value,
		}));
	};

	const resetForm = () => {
		setValues(initialState);
		setStartDate('');
		setStartTime('');
		setEndDate('');
		setEndTime('');
		setEventId('');
	};

	const onSubmit = async (e: any) => {
		e.preventDefault();

		const data = {
			eventData: values,
			representativeList: totalParticipants,
		};

		setLoading(true);
		try {
			EventRequestService.newEventRequest(data, auth?.user?.token).then(
				(res) => {
					if (res.data.code === 200) {
						toast.success(res.data.message);
						setLoading(false);
						resetForm();
					} else {
						toast.error(res.data.message);
						setLoading(false);
					}
				}
			);
		} catch (e: any) {
			toast.error('Request cannot be completed');
			setLoading(false);
		}

		console.log(values);
		console.log(totalParticipants);
	};

	return (
		<div className='sub-body-content xl:!w-[90%] overflow-hidden'>
			<h1 className='page-title'>Event Request</h1>
			<hr className='horizontal-line' />

			<form onSubmit={onSubmit} className='px-10'>
				<div className='items-center form-flex'>
					<div className='form-left-section'></div>
				</div>

				{/* grid section */}

				<div className='grid items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-5'>
					{/* event id */}

					<div className='flex items-center justify-between input-field'>
						Request ID - {getEventId && getEventId}
						<button
							type='button'
							className='rounded-outline-success-btn'
							onClick={generateEventId}
							style={{ marginLeft: '20px' }}
						>
							New
						</button>
					</div>

					{/* start date */}
					<div className='mx-0 mb-4 lg:ml-10 md:my-0'>
						<CustomeDataPicker
							date={startDate}
							setDate={setStartDate}
							title='Start Date'
						/>
					</div>
					{/* end date */}
					<div className='mx-0 mb-4 lg:ml-10 md:my-0'>
						<CustomeDataPicker
							date={endDate}
							setDate={setEndDate}
							title='End Date'
						/>
					</div>
					<div></div>
					{/* start time */}
					<div className='mx-0 mb-4 lg:ml-10 md:my-0'>
						<CustomeTimePicker
							time={startTime}
							setTime={setStartTime}
							title='Start Time'
						/>
					</div>

					{/* end time */}
					<div className='mx-0 mb-4 lg:ml-10 md:my-0'>
						<CustomeTimePicker
							time={endTime}
							setTime={setEndTime}
							title='End Time'
						/>
					</div>
				</div>
				<div className='flex items-center mt-5'>
					{/* no of participants */}
					<div className='mx-0 input-field'>
						<TextBoxLabel name='No of Participants' />

						<input
							id='outlined-basic'
							type='search'
							className='mr-4 tailwind-text-box w-[90%]'
							onChange={onChange}
							name='noParticipants'
							value={values.noParticipants}
							required
						/>
					</div>
					<div className='mx-0 input-field'>
						<TextBoxLabel name='Budget' />
						<input
							id='outlined-basic'
							type='search'
							className='mr-4 tailwind-text-box w-[90%]'
							onChange={onChange}
							name='budget'
							value={values.budget}
							required
						/>
					</div>
					{/* event type */}
					<div className='input-field'>
						<TextBoxLabel name='Event Type' />
						<input
							id='outlined-basic'
							type='search'
							className='mr-4 tailwind-text-box w-[90%]'
							onChange={onChange}
							name='eventType'
							value={values.eventType}
							required
						/>
					</div>
				</div>

				{/* event title */}
				<div className='mx-0 input-field lg:ml-10'>
					<label className='input-label' htmlFor='title'>
						Title
					</label>

					<input
						id='outlined-basic'
						type='search'
						className='tailwind-text-box'
						onChange={onChange}
						name='title'
						value={values.title}
						required
					/>
				</div>

				{/*remarks  */}
				<div className='mx-0 input-field lg:ml-10'>
					<label className='input-label' htmlFor='remark'>
						Remarks
					</label>

					<textarea
						id='outlined-basic'
						className='tailwind-text-box'
						onChange={onChange}
						name='remark'
						value={values.remark}
						required
					></textarea>
				</div>

				<div className='grid grid-cols-2 gap-5 '>
					{/* Budget */}
					<FundingSourceSelector
						name='fundingId'
						onChange={onChange}
						value={values.fundingId}
					/>{' '}
					<ProjectSelector
						name='projectId'
						onChange={onChange}
						value={values.projectId}
					/>
					{/* location */}
					<LocationSelector
						name='locationId'
						onChange={onChange}
						value={values.locationId}
					/>
					{/* Venue type */}
					<VenueSelector
						name='venueId'
						onChange={onChange}
						value={values.venueId}
					/>
				</div>

				<FileInput
					setEventAttachment={setEventAttachment}
					eventAttachment={eventAttachment}
					title='Upload Attachment'
				/>

				<EventRequestParticipants
					total={totalParticipants}
					setTotal={setTotalParticipants}
				/>
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
		</div>
	);
}

export default EventRequest;
