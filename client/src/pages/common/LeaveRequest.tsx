import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { generateID } from '../../utils/generateId';
import CustomeDataPicker from '../../components/DataPicker';
import IEmployeeData from '../../types/admin/IEmployeeData';
import IDesignationData from '../../types/admin/IDesignationData';
import IDivisionData from '../../types/admin/IDivisionData';
import Stack from '@mui/material/Stack';
import EmployeeService from '../../services/admin/EmployeeService';
import DesignationMasterService from '../../services/admin/DesignationMasterService';
import DivisionMasterService from '../../services/admin/DivisionMasterService';
import ILeaveRequest from '../../types/common/ILeaveRequest';

import Projects from '../../components/data/Project.json';
import CustomeTimePicker from '../../components/TimePicker';
import FileInput from '../../components/FileInput';

const initialState: ILeaveRequest = {
	documentNo: '',
	date: '',
	employee: '',
	epfNo: 0,
	divisionId: '',
	hod: '',
	type: '',
	leave: '',
	remainingLeave: '',
	noOfDaysTakenForTheYear: '',
	fromDate: '',
	toDate: '',
	startTime: '',
	endTime: '',
	noOfDaysRequested: '',

	leaveType: '',
	overseasContactNumber: '',
	acting: '',
	attachemnt: '',
	purpose: '',
};

function LeaveRequest() {
	const [getDocNo, setDocNo] = useState<String | any>('');
	const [requestDate, setRequestDate] = React.useState<string | null>(null);
	const [values, setValues] = useState<ILeaveRequest>(initialState);
	const [empData, setEmpData] = useState<Array<IEmployeeData>>([]);
	const [empFoundError, setEmpFoundError] = useState<boolean>(false);
	const [designationData, setDesignationData] = useState<IDesignationData>();
	const [divisionData, setDivisionData] = useState<IDivisionData>();
	const [currentEmp, setCurrentEmp] = useState<IEmployeeData>();
	const [startDate, setStartDate] = React.useState<string | null>(null);
	const [endDate, setEndDate] = React.useState<string | null>(null);
	const [startTime, setStartTime] = React.useState<string | null>(null);
	const [endTime, setEndTime] = React.useState<string | null>(null);
	const [eventAttachment, setEventAttachment] = useState<File | any>();

	useEffect(() => {
		setValues({
			documentNo: values?.documentNo,
			date: requestDate ? requestDate : '',
			employee: values.employee,
			epfNo: values?.epfNo,
			divisionId: values?.divisionId,
			hod: values?.hod,
			type: values?.type,
			leave: values?.leave,
			remainingLeave: values?.remainingLeave,
			noOfDaysTakenForTheYear: values?.noOfDaysTakenForTheYear,
			fromDate: values?.fromDate,
			toDate: values?.toDate,
			startTime: values?.startTime,
			endTime: values?.endTime,
			noOfDaysRequested: values?.noOfDaysRequested,

			leaveType: values?.leaveType,
			overseasContactNumber: values?.overseasContactNumber,
			acting: values?.acting,
			attachemnt: values?.attachemnt,
			purpose: values?.purpose,
		});
	}, [requestDate]);

	useEffect(() => {
		setValues({
			documentNo: values?.documentNo,
			date: requestDate ? requestDate : '',
			employee: values.employee,
			epfNo: values?.epfNo,
			divisionId: values?.divisionId,
			hod: values?.hod,
			type: values?.type,
			leave: values?.leave,
			remainingLeave: values?.remainingLeave,
			noOfDaysTakenForTheYear: values?.noOfDaysTakenForTheYear,
			fromDate: values?.fromDate,
			toDate: values?.toDate,
			startTime: values?.startTime,
			endTime: values?.endTime,
			noOfDaysRequested: values?.noOfDaysRequested,

			leaveType: values?.leaveType,
			overseasContactNumber: values?.overseasContactNumber,
			acting: values?.acting,
			attachemnt: values?.attachemnt,
			purpose: values?.purpose,
		});
	}, [getDocNo]);

	useEffect(() => {
		retreiveEmployees();
		console.log(empData);
	}, []);

	useEffect(() => {
		let employee = empData.find(
			(emp: IEmployeeData) => emp.epfNo.toString() === values.epfNo.toString()
		);
		setCurrentEmp(employee);
		if (employee) {
			setEmpFoundError(false);
		} else {
			setEmpFoundError(true);
		}
		setValues({
			documentNo: values?.documentNo,
			date: requestDate ? requestDate : '',
			employee: values.employee,
			epfNo: values?.epfNo,
			divisionId: values?.divisionId,
			hod: values?.hod,
			type: values?.type,
			leave: values?.leave,
			remainingLeave: values?.remainingLeave,
			noOfDaysTakenForTheYear: values?.noOfDaysTakenForTheYear,
			fromDate: values?.fromDate,
			toDate: values?.toDate,
			startTime: values?.startTime,
			endTime: values?.endTime,
			noOfDaysRequested: values?.noOfDaysRequested,

			leaveType: values?.leaveType,
			overseasContactNumber: values?.overseasContactNumber,
			acting: values?.acting,
			attachemnt: values?.attachemnt,
			purpose: values?.purpose,
		});
		retriveEmployeeDetails(employee);
	}, [values.epfNo]);

	//get designation and division
	const retriveEmployeeDetails = (emp: any) => {
		//get designation
		DesignationMasterService.getDesignation(emp?.designationId)
			.then((res: any) => {
				setDesignationData(res.data.data);
			})
			.catch((e: any) => {
				console.log(e);
			});

		//get divisions

		DivisionMasterService.getDivision(emp?.divisionId)
			.then((res: any) => {
				setDivisionData(res.data.data);
			})
			.catch((e: any) => {
				console.log(e);
			});
	};

	//get employees
	const retreiveEmployees = () => {
		EmployeeService.getAllEmployeeData()
			.then((res: any) => {
				console.log(res.data);
				setEmpData(res.data.data);
			})
			.catch((e: any) => {
				console.log(e);
			});
	};

	const generateDocNo = () => {
		setDocNo(generateID('CE'));
		setValues(initialState);
	};

	//onchange funtion
	const onChange = (e: any) => {
		setValues((preState) => ({
			...preState,
			[e.target.name]: e.target.value,
		}));
	};
	//reset form
	const resetForm = () => {
		setValues(initialState);
		setDocNo('');
	};

	//on Submit
	const onSubmit = async (e: any) => {
		e.preventDefault();
		console.log(values);
	};

	return (
		<div className='sub-body-content xl:!w-[60%]'>
			<h1 className='page-title'>Leave Request</h1>
			<hr className='horizontal-line' />
			<form onSubmit={onSubmit}>
				<div className='grid grid-cols-1 md:grid-cols-2 items-center w-[97%] mx-auto'>
					<Box className='flex items-center justify-between input-field'>
						Document No - {getDocNo}
						<button
							type='button'
							className='rounded-outline-success-btn'
							onClick={generateDocNo}
							style={{ marginLeft: '20px' }}
						>
							New
						</button>
					</Box>
					<div className='mx-0 mb-4 lg:ml-10 md:my-0'>
						<CustomeDataPicker
							date={requestDate}
							setDate={setRequestDate}
							title='Request Date'
						/>
					</div>
					<div className='flex items-center'>
						<div>
							<label className='input-label' htmlFor='epfNo'>
								Employee EPF No
							</label>

							<input
								id='epfNo'
								type='text'
								className='tailwind-text-box w-[40%] mr-4'
								onChange={onChange}
								name='epfNo'
								value={values.epfNo}
							/>
						</div>
						<div>
							<label className='input-label' htmlFor='epfNo'>
								Employee Name
							</label>
							<select
								className='tailwind-text-box'
								value={values.epfNo}
								id='epfNo'
								name='epfNo'
								onChange={onChange}
							>
								<option disabled value={0}>
									Select Employee
								</option>

								{empData?.map((l: IEmployeeData, i: number) => {
									return (
										<option key={i} value={l.epfNo}>
											{l.firstName + ' ' + l.lastName}
										</option>
									);
								})}
							</select>
						</div>
					</div>
				</div>
				{values.epfNo && empFoundError ? (
					<p className='w-[97%] mx-auto error-text-message'>User Not Found!</p>
				) : (
					''
				)}
				<div className='w-[97%] mx-auto'>
					<div className='grid items-center grid-cols-1 md:grid-cols-2'>
						<p className='normal-text'>
							Division :{' '}
							{values.epfNo && divisionData ? (
								<span className='font-bold'>{divisionData.name}</span>
							) : (
								<span className='italic-sm-text'>
									Please select an employee
								</span>
							)}
						</p>

						<p className='normal-text'>
							HOD :{' '}
							{values.epfNo && divisionData ? (
								<span className='font-bold'>{divisionData.name}</span>
							) : (
								<span className='italic-sm-text'>
									Please select an employee
								</span>
							)}
						</p>
					</div>
				</div>
				<div className='mx-0 input-field lg:ml-4'>
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
				<hr className='horizontal-line' />
				<div className='flex w-[100%]'>
					{/* left section of the flex */}
					<div className='flex-1 mr-4'>
						<div className='mx-0 input-field lg:ml-4'>
							<label className='input-label' htmlFor='leaveType'>
								Leave Type
							</label>
							<select
								className='tailwind-text-box w-[90%]'
								value={values.leaveType}
								id='leaveType'
								name='leaveType'
								onChange={onChange}
							>
								<option value='' disabled>
									Select a Item Type
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
						<div className='mx-0 mb-4 lg:ml-4 md:my-0'>
							<CustomeDataPicker
								date={startDate}
								setDate={setStartDate}
								title='Start Date'
							/>
						</div>

						<div className='mx-0 mb-4 lg:mt-2 lg:ml-4 md:my-0'>
							<CustomeTimePicker
								time={startTime}
								setTime={setStartTime}
								title='Start Time'
							/>
						</div>

						<div>
							<label
								className='input-label basis-1/2'
								htmlFor='noOfDaysRequested'
							>
								No of Days Requested
							</label>

							<input
								id='outlined-basic'
								type='search'
								className='mr-4 tailwind-text-box w-[100%]'
								name='noOfDaysRequested'
								onChange={onChange}
								value={values.noOfDaysRequested}
								required
							/>
						</div>
					</div>
					{/* Right section of the flex */}
					<div className='flex-1 mr-4'>
						<div>
							<label className='input-label basis-1/2' htmlFor='remainingLeave'>
								Remaining Leave
							</label>

							<input
								id='outlined-basic'
								type='search'
								className='mr-4 tailwind-text-box w-[100%]'
								name='remainingLeave'
								onChange={onChange}
								value={values.remainingLeave}
								required
							/>
						</div>
						<div className='mx-0 mb-4  md:my-0'>
							<CustomeDataPicker
								date={endDate}
								setDate={setEndDate}
								title='End Date'
							/>
						</div>

						<div className='mx-0 lg:mt-2 mb-4  md:my-0'>
							<CustomeTimePicker
								time={endTime}
								setTime={setEndTime}
								title='End Time'
							/>
						</div>

						<div>
							<label
								className='input-label basis-1/2 mt-4 '
								htmlFor='noOfDaysTakenForTheYear'
							>
								No of Days taken for the year
							</label>

							<input
								id='outlined-basic'
								type='search'
								className='mr-4 tailwind-text-box w-[100%] '
								name='noOfDaysTakenForTheYear'
								onChange={onChange}
								value={values.noOfDaysTakenForTheYear}
								required
							/>
						</div>
					</div>
				</div>
				<hr className='horizontal-line' />
				<div className='flex w-[100%]'>
					{/* left section of the flex */}
					<div className='flex-1 mr-4'>
						<div className='mx-0 input-field lg:ml-4'>
							<label className='input-label' htmlFor='leaveType'>
								Leave Type
							</label>
							<select
								className='tailwind-text-box w-[90%]'
								value={values.leaveType}
								id='leaveType'
								name='leaveType'
								onChange={onChange}
							>
								<option value='' disabled>
									Select a Item Type
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

						<FileInput
							setEventAttachment={setEventAttachment}
							eventAttachment={eventAttachment}
							title='Upload Attachment'
						/>
					</div>
					{/* Right section of the flex */}
					<div className='flex-1 mr-4'>
						<div>
							<label className='input-label basis-1/2' htmlFor='acting'>
								Acting
							</label>

							<input
								id='outlined-basic'
								type='search'
								className='mr-4 tailwind-text-box w-[100%]'
								name='acting'
								onChange={onChange}
								value={values.acting}
								required
							/>
						</div>

						<div>
							<label
								className='input-label basis-1/2'
								htmlFor='overseasContactNumber'
							>
								Overseas Contact Number
							</label>

							<input
								id='outlined-basic'
								type='search'
								className='mr-4 tailwind-text-box w-[100%]'
								name='overseasContactNumber'
								onChange={onChange}
								value={values.overseasContactNumber}
								required
							/>
						</div>
					</div>
				</div>
				<div>
					<label className='input-label basis-1/2' htmlFor='purpose'>
						Purpose
					</label>

					<input
						id='outlined-basic'
						type='search'
						className='mr-4 tailwind-text-box w-[100%]'
						name='purpose'
						onChange={onChange}
						value={values.purpose}
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
		</div>
	);
}

export default LeaveRequest;
