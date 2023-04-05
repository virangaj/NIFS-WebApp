import React, { useState, useEffect } from 'react';
import IOvertime from '../../types/common/IOvertime';
import Box from '@mui/material/Box';
import { generateID } from '../../utils/generateId';
import CustomeDataPicker from '../../components/DataPicker';
import IEmployeeData from '../../types/admin/IEmployeeData';
import EmployeeService from '../../services/admin/EmployeeService';
import DesignationMasterService from '../../services/admin/DesignationMasterService';
import DivisionMasterService from '../../services/admin/DivisionMasterService';
import IDesignationData from '../../types/admin/IDesignationData';
import IDivisionData from '../../types/admin/IDivisionData';
import Stack from '@mui/material/Stack';

const initialState: IOvertime = {
	documentNo: '',
	date: '',
	//   auto generated
	epfNo: '',
	designation: '',
	division: '',
	remark: '',

	noOfHoursRequested: '',
	noOfHoursOTDone: '',
	nameOfWorkToBeDone: '',
	necessityToWorkOvertime: '',
};

export default function Overtime() {
	const [values, setValues] = useState<IOvertime>(initialState);
	const [getDocNo, setDocNo] = useState<String | any>('');
	const [requestDate, setRequestDate] = React.useState<string | null>(null);
	const [empData, setEmpData] = useState<Array<IEmployeeData>>([]);
	const [empFoundError, setEmpFoundError] = useState<boolean>(false);
	const [currentEmp, setCurrentEmp] = useState<IEmployeeData>();
	const [designationData, setDesignationData] = useState<IDesignationData>();
	const [divisionData, setDivisionData] = useState<IDivisionData>();

	useEffect(() => {
		setValues({
			documentNo: values?.documentNo,
			date: requestDate ? requestDate : '',
			epfNo: values?.epfNo,
			designation: values?.designation,
			division: values?.division,
			remark: values?.remark,
			noOfHoursOTDone: values?.noOfHoursOTDone,
			noOfHoursRequested: values?.noOfHoursRequested,
			nameOfWorkToBeDone: values?.nameOfWorkToBeDone,
			necessityToWorkOvertime: values?.necessityToWorkOvertime,
		});
	}, [requestDate]);

	useEffect(() => {
		setValues({
			documentNo: values?.documentNo,
			date: requestDate ? requestDate : '',
			epfNo: values?.epfNo,
			designation: values?.designation,
			division: values?.division,
			remark: values?.remark,
			noOfHoursOTDone: values?.noOfHoursOTDone,
			noOfHoursRequested: values?.noOfHoursRequested,
			nameOfWorkToBeDone: values?.nameOfWorkToBeDone,
			necessityToWorkOvertime: values?.necessityToWorkOvertime,
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
			epfNo: values?.epfNo,
			designation: values?.designation,
			division: values?.division,
			remark: values?.remark,
			noOfHoursOTDone: values?.noOfHoursOTDone,
			noOfHoursRequested: values?.noOfHoursRequested,
			nameOfWorkToBeDone: values?.nameOfWorkToBeDone,
			necessityToWorkOvertime: values?.necessityToWorkOvertime,
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
			<h1 className='page-title'>Overtime</h1>
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
					<p className='normal-text'>
						Designation :{' '}
						{values.epfNo && designationData ? (
							<span className='font-bold'>
								{designationData.designationName}
							</span>
						) : (
							<span className='italic-sm-text'>Please select an employee</span>
						)}
					</p>

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
					</div>
				</div>

				<div className='flex w-[100%]'>
					{/* left section of the flex */}
					<div className='flex-1 mr-4'>
						<div>
							<label
								className='input-label basis-1/2'
								htmlFor='noOfHoursRequested'
							>
								No Of Hours Requested
							</label>

							<input
								id='outlined-basic'
								type='search'
								className='mr-4 tailwind-text-box w-[100%]'
								name='noOfHoursRequested'
								onChange={onChange}
								value={values.noOfHoursRequested}
								required
							/>
						</div>

						<div>
							<label
								className='input-label basis-1/2'
								htmlFor='noOfHoursOTDone'
							>
								No Of Hours OT Done
							</label>

							<input
								id='outlined-basic'
								type='search'
								className='mr-4 tailwind-text-box w-[100%]'
								name='noOfHoursOTDone'
								onChange={onChange}
								value={values.noOfHoursOTDone}
								required
							/>
						</div>
					</div>
					{/* right section of the flex */}
					<div className='flex-1 mr-4'>
						<div>
							<label
								className='input-label basis-1/2'
								htmlFor='nameOfWorkToBeDone'
							>
								Name Of Work To Be Done
							</label>

							<input
								id='outlined-basic'
								type='search'
								className='mr-4 tailwind-text-box w-[100%]'
								name='nameOfWorkToBeDone'
								onChange={onChange}
								value={values.nameOfWorkToBeDone}
								required
							/>
						</div>

						<div>
							<label
								className='input-label basis-1/2'
								htmlFor='necessityToWorkOvertime'
							>
								Necessity To Work Overtime
							</label>

							<input
								id='outlined-basic'
								type='search'
								className='mr-4 tailwind-text-box w-[100%]'
								name='necessityToWorkOvertime'
								onChange={onChange}
								value={values.necessityToWorkOvertime}
								required
							/>
						</div>
					</div>
				</div>

				<div className='w-[97%] mx-auto lg:ml-0'>
					<label className='input-label' htmlFor='remark'>
						Remark
					</label>

					<textarea
						id='remark'
						className='tailwind-text-box w-[100%] mr-4'
						onChange={onChange}
						name='remark'
						value={values.remark}
					></textarea>
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
