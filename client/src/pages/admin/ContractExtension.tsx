import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';
import Stack from '@mui/material/Stack';
import { generateID } from '../../utils/generateId';
import Ripple from '../../components/Ripple';
import IContractExtension from '../../types/IContractExtension';
import CustomeDataPicker from '../../components/DataPicker';
import IEmployeeData from '../../types/IEmployeeData';
import EmployeeService from '../../services/admin/EmployeeService';
import IDesignationData from '../../types/IDesignationData';
import DesignationMasterService from '../../services/admin/DesignationMasterService';
import IDivisionData from '../../types/IDivisionData';
import DivisionMasterService from '../../services/admin/DivisionMasterService';

function ContractExtension() {
	const [getDocNo, setDocNo] = useState<String | any>('');
	const [requestDate, setRequestDate] = React.useState<string | null>(null);
	const [designationData, setDesignationData] = useState<IDesignationData>();
	const [divisionData, setDivisionData] = useState<IDivisionData>();

	const [empFoundError, setEmpFoundError] = useState<boolean>(false);
	const [empData, setEmpData] = useState<Array<IEmployeeData>>([]);
	const [currentEmp, setCurrentEmp] = useState<IEmployeeData>();
	const [values, setValues] = useState<IContractExtension>({
		docNo: '',
		date: '',
		epfNo: 0,
		designationId: '',
		divisionId: '',
		hod: '',
		remark: '',
	});

	useEffect(() => {
		setValues({
			docNo: values?.docNo,
			date: requestDate ? requestDate : '',
			epfNo: values?.epfNo,
			designationId: values?.designationId,
			divisionId: values?.divisionId,
			hod: values?.hod,
			remark: values?.remark,
		});
	}, [requestDate]);

	useEffect(() => {
		setValues({
			docNo: getDocNo && getDocNo,
			date: requestDate ? requestDate : '',
			epfNo: values?.epfNo,
			designationId: values?.designationId,
			divisionId: values?.divisionId,
			hod: values?.hod,
			remark: values?.remark,
		});
		console.log(getDocNo);
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
			docNo: getDocNo && getDocNo,
			date: requestDate ? requestDate : '',
			epfNo: values?.epfNo,
			designationId: employee?.designationId,
			divisionId: employee?.divisionId,
			hod: values?.hod,
			remark: values?.remark,
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

		//get divions

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

	// generate document ID
	const generateDocNo = () => {
		setDocNo(generateID('CE'));
		setValues({
			docNo: '',
			date: '',
			epfNo: 0,
			designationId: '',
			divisionId: '',
			hod: '',
			remark: '',
		});
	};

	//reset form
	const resetForm = () => {
		setValues({
			docNo: '',
			date: '',
			epfNo: 0,
			designationId: '',
			divisionId: '',
			hod: '',
			remark: '',
		});
		setDocNo('');
	};

	//onchange funtion
	const onChange = (e: any) => {
		setValues((preState) => ({
			...preState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = async (e: any) => {
		e.preventDefault();
		console.log(values);
	};

	return (
		<div className='sub-body-content xl:!w-[60%]'>
			<h1 className='page-title'>Contract Extension</h1>
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

				<div className='w-[97%] mx-auto'>
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

export default ContractExtension;
