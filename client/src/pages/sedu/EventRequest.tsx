import React, { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import IEventRequest from '../../types/IEventRequest';
import { generateID } from '../../utils/generateId';
import CustomeDataPicker from '../../components/DataPicker';

import CustomeTimePicker from '../../components/TimePicker';
import FileInput from '../../components/FileInput';
import EventRequestParticipants from './shared/EventRequestParticipants';

import Projects from '../../components/data/Project.json';

const initialState: IEventRequest = {
	eventId: '',
	eventType: '',
	type: '',
	title: '',
	remarks: '',
	startDate: '',
	endDate: '',
	startTime: '',
	endTime: '',
	noParticipants: 0,
	budget: 0,
	project: '',
	vote: '',
	location: '',
	venueName: '',
	venueType: '',
	fundType: '',
};

function EventRequest() {
	const [startDate, setStartDate] = React.useState<string | null>(null);
	const [startTime, setStartTime] = React.useState<string | null>(null);

	const [endDate, setEndDate] = React.useState<string | null>(null);
	const [endTime, setEndTime] = React.useState<string | null>(null);

	const [getEventId, setEventId] = useState<String | any>('');

	const [totalParticipants, setTotalParticipants] = useState([]);

	const [eventAttachment, setEventAttachment] = useState<File | any>();

	const [values, setValues] = useState<IEventRequest>(initialState);

	useEffect(() => {
		setValues({
			eventId: getEventId,
			eventType: values?.eventType,
			type: values?.type,
			title: values?.title,
			remarks: values?.remarks,
			startDate: startDate ? startDate : '',
			endDate: endDate ? endDate : '',
			startTime: startTime ? startTime : '',
			endTime: endTime ? endTime : '',
			noParticipants: values?.noParticipants,
			budget: values?.budget,
			project: values?.project,
			vote: values?.vote,
			location: values?.location,
			venueName: values?.venueName,
			venueType: values?.venueType,
			fundType: values?.fundType,
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
		setValues({
			eventId: getEventId,
			eventType: values?.eventType,
			type: values?.type,
			title: values?.title,
			remarks: values?.remarks,
			startDate: values?.startDate,
			endDate: values?.endDate,
			startTime: values?.startTime,
			endTime: values?.endTime,
			noParticipants: values?.noParticipants,
			budget: values?.budget,
			project: values?.project,
			vote: values?.vote,
			location: values?.location,
			venueName: values?.venueName,
			venueType: values?.venueType,
			fundType: values?.fundType,
		});
		console.log(values);
		console.log(getEventId);
	};

	return (
		<div className='sub-body-content xl:!w-[90%] overflow-hidden'>
			<h1 className='page-title'>Event Request</h1>
			<hr className='horizontal-line' />

			<form onSubmit={onSubmit}>
				<div className='items-center form-flex'>
					<div className='form-left-section'></div>
				</div>

				{/* grid section */}

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center w-[97%] mx-auto'>
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
					{/* event type */}
					<div className='input-field'>
						<label className='input-label' htmlFor='eventType'>
							Event Type
						</label>
						<select
							className='tailwind-text-box w-[90%]'
							value={values.eventType}
							id='outlined-basic'
							name='eventType'
							onChange={onChange}
						>
							<option value='' disabled>
								Select a Event type
							</option>

							{Projects
								? Projects.map((p, index) => (
										<option value={p.value} key={index}>
											{p.value}
										</option>
								  ))
								: ''}
						</select>
					</div>

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

					{/* type */}
					<div className='input-field'>
						<label className='input-label' htmlFor='type'>
							Type
						</label>
						<select
							className='tailwind-text-box w-[90%]'
							value={values.type}
							id='type'
							name='type'
							onChange={onChange}
						>
							<option value='' disabled>
								Select a Type
							</option>

							{Projects
								? Projects.map((p, index) => (
										<option value={p.value} key={index}>
											{p.value}
										</option>
								  ))
								: ''}
						</select>
					</div>

					{/* no of participants */}
					<div className='mx-0 input-field lg:ml-10'>
						<label className='input-label' htmlFor='noParticipants'>
							No of Participants
						</label>

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
					<div className='mx-0 input-field lg:ml-10'>
						<label className='input-label' htmlFor='budget'>
							Budget
						</label>

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
				</div>

				{/* event title */}
				<div className='mx-0 input-field lg:ml-10'>
					<label className='input-label' htmlFor='title'>
						Title
					</label>

					<input
						id='outlined-basic'
						type='search'
						className='mr-4 tailwind-text-box w-[90%]'
						onChange={onChange}
						name='title'
						value={values.title}
						required
					/>
				</div>

				{/*remarks  */}
				<div className='mx-0 input-field lg:ml-10'>
					<label className='input-label' htmlFor='remarks'>
						Remarks
					</label>

					<textarea
						id='outlined-basic'
						className='mr-4 tailwind-text-box w-[90%]'
						onChange={onChange}
						name='remarks'
						value={values.remarks}
						required
					></textarea>
				</div>

				<div className='items-center form-flex'>
					<div className='form-left-section'>
						{/* project */}
						<div className='mx-0 input-field lg:ml-4'>
							<label className='input-label' htmlFor='project'>
								Project
							</label>
							<select
								className='tailwind-text-box w-[90%]'
								value={values.project}
								id='project'
								name='project'
								onChange={onChange}
							>
								<option value='' disabled>
									Select a Project
								</option>

								{Projects
									? Projects.map((p, index) => (
											<option value={p.value} key={index}>
												{p.value}
											</option>
									  ))
									: ''}
							</select>
						</div>
					</div>

					<div className='form-right-section'>
						{/* vote */}
						<div className='mx-0 input-field lg:ml-4'>
							<label className='input-label' htmlFor='vote'>
								Vote
							</label>
							<select
								className='tailwind-text-box w-[90%]'
								value={values.vote}
								id='vote'
								name='vote'
								onChange={onChange}
							>
								<option value='' disabled>
									Select a Vote
								</option>

								{Projects
									? Projects.map((p, index) => (
											<option value={p.value} key={index}>
												{p.value}
											</option>
									  ))
									: ''}
							</select>
						</div>
					</div>
				</div>
				<div className='items-center form-flex'>
					<div className='form-left-section'>
						{/* Budget */}
						<div className='mx-0 input-field lg:ml-4'>
							<label className='input-label' htmlFor='fundType'>
								External /Fund Internal / Budget
							</label>
							<select
								className='tailwind-text-box w-[90%]'
								value={values.fundType}
								id='fundType'
								name='fundType'
								onChange={onChange}
							>
								<option value='' disabled>
									Select a Fund type
								</option>

								{Projects
									? Projects.map((p, index) => (
											<option value={p.value} key={index}>
												{p.value}
											</option>
									  ))
									: ''}
							</select>
						</div>
					</div>
					<div className='form-right-section'>
						{/* location */}
						<div className='mx-0 input-field lg:ml-4'>
							<label className='input-label' htmlFor='location'>
								Location
							</label>
							<select
								className='tailwind-text-box w-[90%]'
								value={values.location}
								id='location'
								name='location'
								onChange={onChange}
							>
								<option value='' disabled>
									Select a Loation
								</option>

								{Projects
									? Projects.map((p, index) => (
											<option value={p.value} key={index}>
												{p.value}
											</option>
									  ))
									: ''}
							</select>
						</div>
					</div>
				</div>
				<div className='items-center form-flex'>
					<div className='form-right-section'>
						{/* venue name */}
						<div className='mx-0 input-field lg:ml-4'>
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
					</div>
					<div className='form-right-section'>
						{/* Venue type */}
						<div className='mx-0 input-field lg:ml-4'>
							<label className='input-label' htmlFor='venueType'>
								Venue Type
							</label>
							<select
								className='tailwind-text-box w-[90%]'
								value={values.venueType}
								id='venueType'
								name='venueType'
								onChange={onChange}
							>
								<option value='' disabled>
									Select a Venue type
								</option>

								{Projects
									? Projects.map((p, index) => (
											<option value={p.value} key={index}>
												{p.value}
											</option>
									  ))
									: ''}
							</select>
						</div>
					</div>
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
