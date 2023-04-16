import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { generateID } from '../../utils/generateId';
import CustomeDataPicker from '../../components/DataPicker';
import IEmployeeData from '../../types/admin/IEmployeeData';
import IWorkRequest from '../../types/common/IWorkRequest';

import Projects from '../../components/data/Project.json';
import { useAppSelector } from '../../hooks/hooks';
import EmployeeSelector from '../../components/shared/EmployeeSelector';
import DesignationSelector from '../../components/shared/DesignationSelector';
import DivisionSelector from '../../components/shared/DivisionSelector';
import { toast } from 'react-toastify';
import WorkRequestService from '../../services/common/WorkRequestService';
import { RequestStatus } from '../../constant/requestStatus';

const initialState: IWorkRequest = {
	// generated
	documentNo: '',
	epfNo: 0,
	hod: 0,
	designationId: '',
	divisionId: '',

	date: '',
	project: '',
	workType: '',
	program: '',
	hodEmail: '',
	supervisorEmail: '',
	workDescription: '',
	googleLinkWithWorkDescription: '',

	hodApproved: RequestStatus.PENDING,
	dirApproved: RequestStatus.PENDING,
};

function WorkRequest() {
	const [getDocNo, setDocNo] = useState<String | any>('');
	const [requestDate, setRequestDate] = React.useState<string | null>(null);

	const [values, setValues] = useState<IWorkRequest>(initialState);
	const [hod, setHod] = useState<IEmployeeData | null>();
	const [loading, setLoading] = useState(false);

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
			date: requestDate ? requestDate : '',
		});
	}, [requestDate]);

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
			const result = WorkRequestService.saveWorkRequest(
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
				toast.success('Article Request Added Successfully');
				resetForm();
			} else {
				toast.error('Request Cannot be Completed');
			}
			setLoading(false);
		}, 1000);
	};

	return (
		<div className='sub-body-content xl:!w-[60%]'>
			<h1 className='page-title'>Work Request</h1>
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

				<div className='mx-0 mb-4 lg:ml-4 md:my-0'>
					<CustomeDataPicker
						date={requestDate}
						setDate={setRequestDate}
						title='Request Date'
					/>
				</div>

				<div className='flex w-[100%]'>
					{/* left section of the flex */}
					<div className='flex-1 mr-4'>
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

						<div className='mx-0 input-field lg:ml-4'>
							<label className='input-label' htmlFor='workType'>
								Work Type:
							</label>
							<select
								className='tailwind-text-box w-[90%]'
								value={values.workType}
								id='workType'
								name='workType'
								onChange={onChange}
							>
								<option value='' disabled>
									Select a workType
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

						<div className='mx-0 input-field lg:ml-4'>
							<label className='input-label' htmlFor='supervisorEmail'>
								Supervisor Email:
							</label>
							<select
								className='tailwind-text-box w-[90%]'
								value={values.supervisorEmail}
								id='supervisorEmail'
								name='supervisorEmail'
								onChange={onChange}
							>
								<option value='' disabled>
									Select a Supervisor Email
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
					{/* Right section of the flex */}
					<div className='flex-1 mr-4'>
						<div className='mx-0 input-field lg:ml-4'>
							<label className='input-label' htmlFor='program'>
								Program:
							</label>
							<select
								className='tailwind-text-box w-[90%]'
								value={values.program}
								id='program'
								name='program'
								onChange={onChange}
							>
								<option value='' disabled>
									Select a Program
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

						<div className='mx-0 input-field lg:ml-4'>
							<label className='input-label' htmlFor='hodEmail'>
								HOD Email:
							</label>
							<select
								className='tailwind-text-box w-[90%]'
								value={values.hodEmail}
								id='hodEmail'
								name='hodEmail'
								onChange={onChange}
							>
								<option value='' disabled>
									Select a HOD Email
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
				<div className='w-[97%] mx-auto'>
					<label className='input-label basis-1/2' htmlFor='workDescription'>
						Type Work Description Here:
					</label>

					<input
						id='outlined-basic'
						type='search'
						className='mr-4 tailwind-text-box w-[100%]'
						name='workDescription'
						onChange={onChange}
						value={values.workDescription}
						required
					/>
				</div>

				<div className='w-[97%] mx-auto'>
					<label
						className='input-label basis-1/2'
						htmlFor='googleLinkWithWorkDescription'
					>
						Create a Google Link With Work Description and paste it here:
					</label>

					<input
						id='outlined-basic'
						type='search'
						className='mr-4 tailwind-text-box w-[100%]'
						name='googleLinkWithWorkDescription'
						onChange={onChange}
						value={values.googleLinkWithWorkDescription}
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

export default WorkRequest;
