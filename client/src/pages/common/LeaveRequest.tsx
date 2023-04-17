import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { generateID } from '../../utils/generateId';
import CustomeDataPicker from '../../components/DataPicker';
import IEmployeeData from '../../types/admin/IEmployeeData';
import Stack from '@mui/material/Stack';
import ILeaveRequest from '../../types/common/ILeaveRequest';

import Projects from '../../components/data/Project.json';
import CustomeTimePicker from '../../components/TimePicker';
import { useAppSelector } from '../../hooks/hooks';
import LeaveRequestService from '../../services/common/LeaveRequestService';
import { toast } from 'react-toastify';
import EmployeeSelector from '../../components/shared/EmployeeSelector';
import DesignationSelector from '../../components/shared/DesignationSelector';
import DivisionSelector from '../../components/shared/DivisionSelector';
import { RequestStatus } from '../../constant/requestStatus';

const initialState: ILeaveRequest = {
	// generated
	documentNo: '',
	epfNo: 0,
	hod: 0,
	designationId: '',
	divisionId: '',

	leaveType: '',
	startDate: '',
	startTime: '',
	durationInDays: '',

	requestDateOptional: '',
	jobCategory: '',
	evidence: '',
	hodApproved: RequestStatus.PENDING,
	dirApproved: RequestStatus.PENDING,
};

function LeaveRequest() {
	const [getDocNo, setDocNo] = useState<String | any>('');
	const [requestDate, setRequestDate] = React.useState<string | null>(null);
	const [values, setValues] = useState<ILeaveRequest>(initialState);
	const [startDate, setStartDate] = React.useState<string | null>(null);
	const [startTime, setStartTime] = React.useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [hod, setHod] = useState<IEmployeeData | null>();

	const { employees, employeesIsLoading, employeesIsSuccess } = useAppSelector(
		(state) => state.employees
	);
	const { division, divisionIsLoading, divisionIsSuccess } = useAppSelector(
		(state) => state.division
	);

	const { auth } = useAppSelector((state) => state.persistedReducer);

	useEffect(() => {
		setValues({
			...values,
			startDate: startDate ? startDate : '',
			startTime: startTime ? startTime : '',
		});
	}, [requestDate, startDate, startTime]);

	useEffect(() => {
		setValues({
			...values,
			documentNo: getDocNo && getDocNo,
		});
		console.log(getDocNo);
	}, [getDocNo]);

	useEffect(() => {
		const divisionData = division.find(
			(d) => d.divisionId === values.divisionId
		);

		if (divisionData) {
			const employeeId = divisionData.hod;
			const employee = employees.find((e) => e.epfNo === employeeId);
			// console.log(employee);
			if (employee) {
				setHod(employee);
				setValues({
					...values,
					hod: employee.epfNo,
				});
			}
		}
	}, [values.divisionId]);

	// generate Doc number ID
	const generateDocNo = () => {
		setDocNo(generateID('RR'));
		setValues(initialState);
	};

	//reset form
	const resetForm = () => {
		setValues(initialState);
		setDocNo('');
		setHod(null);
	};

	//  onChange Function
	const onChange = (e: any) => {
		setValues((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = async (e: any) => {
		e.preventDefault();
		console.log(values);

		setLoading(true);
		setTimeout(() => {
			const result = LeaveRequestService.saveLeaveRequest(
				values,
				auth?.user?.token
			)
				.then((res) => {
					console.log(res);
				})
				.catch((e) => {
					console.log(e);
				});

			if (result !== null) {
				toast.success('Leave Request Added Successfully');
				resetForm();
			} else {
				toast.error('Request Cannot be Completed');
			}
			setLoading(false);
		}, 1000);
	};

	return (
		<div className='sub-body-content xl:!w-[60%]'>
			<h1 className='page-title'>Leave Request</h1>
			<hr className='horizontal-line' />
			<form onSubmit={onSubmit}>
				<div className='grid grid-cols-1 md:grid-cols-2 items-center w-[97%] mx-auto'>
					<Box className='flex items-center justify-between input-field'>
						Document No - {getDocNo && getDocNo}
						<button
							type='button'
							className='rounded-outline-success-btn'
							onClick={generateDocNo}
							style={{ marginLeft: '20px' }}
						>
							New
						</button>
					</Box>
				</div>

				<div className='w-[97%] mx-auto'>
					<EmployeeSelector
						onChange={onChange}
						value={values.epfNo}
						name='epfNo'
					/>
				</div>

				<div className='w-[97%] mx-auto'>
					<DesignationSelector
						onChange={onChange}
						value={values.designationId}
						name='designationId'
					/>
				</div>

				<div className='w-[97%] mx-auto'>
					<DivisionSelector
						onChange={onChange}
						value={values.divisionId}
						name='divisionId'
					/>
				</div>

				<div className='w-[97%] mx-auto'>
					<div className='grid items-center grid-cols-1 md:grid-cols-2'>
						<p className='normal-text'>
							HOD :{' '}
							{values.divisionId && hod ? (
								<span className='font-bold'>
									{hod.firstName + ' ' + hod.lastName}
								</span>
							) : (
								<span className='italic-sm-text'>Please select a Division</span>
							)}
						</p>
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

						<div>
							<label
								className='input-label basis-1/2 lg:ml-4'
								htmlFor='durationInDays'
							>
								Duration In Days:
							</label>

							<input
								id='outlined-basic'
								type='search'
								className='mr-4 lg:ml-4 tailwind-text-box w-[100%]'
								name='durationInDays'
								onChange={onChange}
								value={values.durationInDays}
								required
							/>
						</div>

						<label
							className='input-label basis-1/2 lg:ml-4'
							htmlFor='requestDate'
						>
							If you apply for a leave: state the date, if not ignore this
							field:
						</label>

						<div className='mx-0 mb-4 lg:ml-4 md:my-0 lg:mb-4'>
							<CustomeDataPicker
								date={requestDate}
								setDate={setRequestDate}
								title='Request Date'
								name='requestDate'
							/>
						</div>
					</div>
					{/* Right section of the flex */}
					<div className='flex-1 mr-4'>
						<div className='mx-0 mb-4  md:my-0 lg:ml-6'>
							<CustomeDataPicker
								date={startDate}
								setDate={setStartDate}
								title='Start Date'
							/>
						</div>

						<div className='mx-0  mb-4  md:my-0 lg:mt-4 lg:ml-6'>
							<CustomeTimePicker
								time={startTime}
								setTime={setStartTime}
								title='Start Time'
							/>
						</div>
					</div>
				</div>
				<hr className='horizontal-line' />
				<div className='flex w-[100%]'>
					{/* left section of the flex */}
					<div className='mx-0 input-field lg:ml-4'>
						<label className='input-label' htmlFor='jobCategory'>
							Job Category:
						</label>
						<select
							className='tailwind-text-box w-[90%]'
							value={values.jobCategory}
							id='jobCategory'
							name='jobCategory'
							onChange={onChange}
						>
							<option value='' disabled>
								Select a Job Category:
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

					{/* Right section of the flex */}
				</div>

				<div className='w-[97%] mx-auto'>
					<label className='input-label basis-1/2' htmlFor='evidence'>
						Evidence:
					</label>

					<input
						id='outlined-basic'
						type='search'
						className='mr-4 tailwind-text-box w-[100%]'
						name='evidence'
						onChange={onChange}
						value={values.evidence}
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
