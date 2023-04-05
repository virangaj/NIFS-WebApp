import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';
import Stack from '@mui/material/Stack';
import { useAppSelector } from '../../hooks/hooks';

import { generateID } from '../../utils/generateId';
import Ripple from '../../components/Ripple';
import IContractExtension from '../../types/admin/IContractExtension';
import CustomeDataPicker from '../../components/DataPicker';
import IEmployeeData from '../../types/admin/IEmployeeData';
import EmployeeService from '../../services/admin/EmployeeService';
import IDesignationData from '../../types/admin/IDesignationData';
import DesignationMasterService from '../../services/admin/DesignationMasterService';
import IDivisionData from '../../types/admin/IDivisionData';
import DivisionMasterService from '../../services/admin/DivisionMasterService';
import DivisionSelector from '../../components/shared/DivisionSelector';
import IResignationRequest from '../../types/admin/IResignationRequest';
import DesignationSelector from '../../components/shared/DesignationSelector';
import EmployeeSelector from '../../components/shared/EmployeeSelector';

const initialState: IResignationRequest = {
	documentNo: '',
	date: '',
	epfNo: 0,
	designationId: '',
	divisionId: '',
	hod: '',
	remark: '',
	hodApproved: false,
	dirApproved: false,
};

function ResignationRequest() {
	const [getDocNo, setDocNo] = useState<String | any>('');
	const [requestDate, setRequestDate] = React.useState<string | null>(null);
	const [designationData, setDesignationData] = useState<IDesignationData>();
	const [divisionData, setDivisionData] = useState<IDivisionData>();

	const [empFoundError, setEmpFoundError] = useState<boolean>(false);
	const [empData, setEmpData] = useState<Array<IEmployeeData>>([]);
	const [currentEmp, setCurrentEmp] = useState<IEmployeeData>();
	const [values, setValues] = useState<IContractExtension>(initialState);
	const [hod, setHod] = useState('');
	const { employees, employeesIsLoading, employeesIsSuccess } = useAppSelector(
		(state) => state.employees
	);

	useEffect(() => {
		setValues({
			documentNo: values?.documentNo,
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
			documentNo: getDocNo && getDocNo,
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
				setEmpData(res.data.data);
			})
			.catch((e: any) => {
				console.log(e);
			});
	};

	// generate document ID
	const generateDocNo = () => {
		setDocNo(generateID('CE'));
		setValues(initialState);
	};

	//reset form
	const resetForm = () => {
		setValues(initialState);
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
			<h1 className='page-title'>Resignation Request</h1>
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

					<EmployeeSelector
						onChange={onChange}
						value={values.epfNo}
						name='epfNo'
					/>
				</div>
				{values.epfNo && empFoundError ? (
					<p className='w-[97%] mx-auto error-text-message'>User Not Found!</p>
				) : (
					''
				)}
				<div className='w-[97%] mx-auto'>
					<DivisionSelector
						onChange={onChange}
						value={values.divisionId}
						name='divisionId'
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
					<p className='normal-text'>
						Designation :{' '}
						{values.designationId && employees ? (
							<span className='font-bold'>
								{/* {designationData.designationName} */}
							</span>
						) : (
							<span className='italic-sm-text'>Please select an employee</span>
						)}
					</p>

					<div className='grid items-center grid-cols-1 md:grid-cols-2'>
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

export default ResignationRequest;
