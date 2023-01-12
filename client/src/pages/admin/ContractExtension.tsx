import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';

import { generateID } from '../../constant/generateId';
import Ripple from '../../components/Ripple';
import IContractExtension from '../../types/ContractExtension';
import CustomeDataPicker from '../../components/DataPicker';
import IEmployeeData from '../../types/EmployeeData';
import EmployeeService from '../../services/admin/EmployeeService';

function ContractExtension() {
	const [getDocNo, setDocNo] = useState<String | any>('');
	const [requestDate, setRequestDate] = React.useState<string | null>(null);

	const [empFoundError, setEmpFoundError] = useState<boolean>(false);
	const [empData, setEmpData] = useState<Array<IEmployeeData>>([]);
	const [currentEmp, setCurrentEmp] = useState<IEmployeeData>();
	const [values, setValues] = useState<IContractExtension>({
		docNo: '',
		date: '',
		emploeeId: '',
		designation: '',
		divison: '',
		hod: '',
		remark: '',
	});

	useEffect(() => {
		setValues({
			docNo: values?.docNo,
			date: requestDate ? requestDate : '',
			emploeeId: values?.emploeeId,
			designation: values?.designation,
			divison: values?.divison,
			hod: values?.hod,
			remark: values?.remark,
		});
	}, [requestDate]);
	useEffect(() => {
		retreiveEmployees();
		console.log(empData);
	}, []);

	useEffect(() => {
		let employee = empData.find((emp) => emp.epfNo.toString() === values.emploeeId);
		setCurrentEmp(employee);
        if (employee) {
			setEmpFoundError(false);
		} else {
			setEmpFoundError(true);
		}
		
	}, [values.emploeeId]);

	const retreiveEmployees = () => {
		EmployeeService.getAllEmployeeData()
			.then((res: any) => {
				setEmpData(res.data);
			})
			.catch((e: any) => {
				console.log(e);
			});
	};

	const generateDocNo = () => {
		setDocNo(generateID('CE'));
		resetForm();
	};
	const resetForm = () => {
		setValues({
			docNo: '',
			date: '',
			emploeeId: '',
			designation: '',
			divison: '',
			hod: '',
			remark: '',
		});
	};
	const onChange = (e: any) => {
		setValues((preState) => ({
			...preState,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<div className='sub-body-content xl:!w-[80%]'>
			<h1 className='page-title'>Contract Extension</h1>
			<hr className='horizontal-line' />
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 items-center w-[97%] mx-auto'>
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
						title='Start Date'
					/>
				</div>

				<div className='flex items-center'>
					<div>
						<label className='input-label' htmlFor='emploeeId'>
							Employee EPF No
						</label>

						<input
							id='emploeeId'
							type='text'
							className='tailwind-text-box w-[40%] mr-4'
							onChange={onChange}
							name='emploeeId'
							value={values.emploeeId}
						/>
						{values.emploeeId && empFoundError ? (
							<p className='error-text-message'>User Not Found!</p>
						) : (
							''
						)}
					</div>
					<div>
						<label className='input-label' htmlFor='emploeeId'>
							Employee Name
						</label>
						<select
							className='tailwind-text-box'
							value={values.emploeeId}
							id='emploeeId'
							name='emploeeId'
							onChange={onChange}
						>
							<option disabled value=''>
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

			<div className='w-[97%] mx-auto'>
				<p>Designation {values.emploeeId && currentEmp?.designation}</p>
			</div>
		</div>
	);
}

export default ContractExtension;
