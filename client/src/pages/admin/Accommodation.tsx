import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Stack from '@mui/material/Stack';
import { generateID } from '../../utils/generateId';
import Ripple from '../../components/Ripple';
import CustomeDataPicker from '../../components/DataPicker';
import IEmployeeData from '../../types/admin/IEmployeeData';
import IDesignationData from '../../types/admin/IDesignationData';
import IDivisionData from '../../types/admin/IDivisionData';
import IAccommodation from '../../types/admin/IAccommodation';
import { Box } from '@mui/material';
import { useAppSelector } from '../../hooks/hooks';
import AccomodationService from '../../services/admin/AccomodationService';
import EmployeeSelector from '../../components/shared/EmployeeSelector';
import DesignationSelector from '../../components/shared/DesignationSelector';
import DivisionSelector from '../../components/shared/DivisionSelector';
import { RequestStatus } from '../../constant/requestStatus';

const initialState: IAccommodation = {
	documentNo: '',
	epfNo: 0,
	designationId: '',
	divisionId: '',
	hod: 0,

	//gueset details
	date: '',
	guestName: '',
	address: '',
	email: '',
	nicNo: '',
	telephoneNo: '',

	//reason for request accommodation
	requestType: '',

	//accommodation
	roomNumber: '',
	noOfDays: 0,
	fromDate: '',
	toDate: '',
	roomRates: '',
	roomType: '',
	totalCharges: '',

	//payment
	payee: '',

	hodApproved: RequestStatus.PENDING,
	dirApproved: RequestStatus.PENDING,
};

function Accommodation() {
	const [getDocumentNo, setDocumentNo] = useState<String | any>('');
	const [empData, setEmpData] = useState<Array<IEmployeeData>>([]);
	const [docDate, setDocDate] = React.useState<string | null>(null);
	const [startDate, setStartDate] = React.useState<string | null>(null);
	const [endDate, setEndDate] = React.useState<string | null>(null);
	const [currentEmp, setCurrentEmp] = useState<IEmployeeData>();
	const [empFoundError, setEmpFoundError] = useState<boolean>(false);
	const [designationData, setDesignationData] = useState<IDesignationData>();
	const [divisionData, setDivisionData] = useState<IDivisionData>();
	const [values, setValues] = useState<IAccommodation>(initialState);
	const [requestDate, setRequestDate] = React.useState<string | null>(null);
	const [getDocNo, setDocNo] = useState<String | any>('');
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
			toDate: endDate ? endDate : '',
			fromDate: startDate ? startDate : '',
		});
	}, [requestDate, endDate, startDate]);

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
		setDocNo(generateID('CC'));
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

	//onsubmit
	const onSubmit = async (e: any) => {
		e.preventDefault();
		console.log(values);

		setLoading(true);
		setTimeout(() => {
			const result = AccomodationService.saveAccomodationRequest(
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
				toast.success('Accomodation Request Added Successfully');
				resetForm();
			} else {
				toast.error('Request Cannot be Completed');
			}
			setLoading(false);
		}, 1000);
	};

	return (
		<div className='sub-body-content xl:!w-[80%]'>
			<h1 className='page-title'>Accommodation</h1>
			<form onSubmit={onSubmit}>
				<h1 className='sub-page-title'>Guest Details</h1>
				<hr className='horizontal-line' />

				<div className='flex w-[100%]'>
					{/* left section of the flex */}
					<div className='flex-1 mr-4'>
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

						<EmployeeSelector
							onChange={onChange}
							value={values.epfNo}
							name='epfNo'
						/>

						{values.epfNo && empFoundError ? (
							<p className='w-[97%] mx-auto error-text-message'>
								User Not Found!
							</p>
						) : (
							''
						)}

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
										<span className='italic-sm-text'>
											Please select a Division
										</span>
									)}
								</p>
							</div>
						</div>

						<div className='mx-0 mb-4 lg:ml-10 md:my-0'>
							<CustomeDataPicker
								date={requestDate}
								setDate={setRequestDate}
								title='Request Date'
							/>
						</div>
					</div>

					{/* right section of the flex */}
					<div className='flex-1 ml-4 -mt-7'>
						{/* guest name  */}
						<div>
							<label className='input-label basis-1/2' htmlFor='employee'>
								Guest Name
							</label>

							<input
								id='outlined-basic'
								type='search'
								className='mr-4 tailwind-text-box w-[100%]'
								name='guestName'
								onChange={onChange}
								value={values.guestName}
								required
							/>
						</div>

						{/* address  */}
						<div>
							<label className='input-label basis-1/2' htmlFor='address'>
								Address
							</label>

							<input
								id='outlined-basic'
								type='search'
								className='mr-4 tailwind-text-box w-[100%]'
								name='address'
								onChange={onChange}
								value={values.address}
								required
							/>
						</div>

						{/* email */}
						<div>
							<label className='input-label basis-1/2' htmlFor='email'>
								Email
							</label>

							<input
								id='outlined-basic'
								type='email'
								className='mr-4 tailwind-text-box w-[100%]'
								name='email'
								onChange={onChange}
								value={values.email}
								required
							/>
						</div>

						<div className='flex items-center justify-between'>
							<div className='flex-1 mr-2'>
								<label className='input-label basis-1/2' htmlFor='nicNo'>
									NIC No
								</label>

								<input
									id='outlined-basic'
									type='search'
									className='mr-4 tailwind-text-box w-[100%]'
									name='nicNo'
									onChange={onChange}
									value={values.nicNo}
									required
								/>
							</div>
						</div>

						<div>
							<label className='input-label basis-1/2' htmlFor='requestType'>
								Request Type
							</label>

							<input
								id='outlined-basic'
								type='search'
								className='mr-4 tailwind-text-box w-[100%]'
								name='requestType'
								onChange={onChange}
								value={values.requestType}
								required
							/>
						</div>

						<div>
							<label className='input-label basis-1/2' htmlFor='telephoneNo'>
								Telephone No
							</label>

							<input
								id='outlined-basic'
								type='search'
								className='mr-4 tailwind-text-box w-[100%]'
								name='telephoneNo'
								onChange={onChange}
								value={values.telephoneNo}
								required
							/>
						</div>
					</div>
				</div>

				<h1 className='sub-page-title'>Accommodation</h1>
				<hr className='horizontal-line' />

				<div className='flex w-[100%]'>
					{/* left section of the flex */}
					<div className='flex-1 mr-4'>
						<label className='input-label basis-1/2'>Duration</label>
						<div className='grid grid-cols-2 gap-4'>
							<div className='mx-0 mb-4 lg:ml-10 md:my-0'>
								<CustomeDataPicker
									date={startDate}
									setDate={setStartDate}
									title='From'
								/>
							</div>

							<div className='mx-0 mb-4 lg:ml-10 md:my-0'>
								<CustomeDataPicker
									date={endDate}
									setDate={setEndDate}
									title='To'
								/>
							</div>
						</div>

						<div>
							<label className='input-label basis-1/2' htmlFor='roomRates'>
								Room Rates
							</label>

							<input
								id='outlined-basic'
								type='search'
								className='mr-4 tailwind-text-box w-[100%]'
								name='roomRates'
								onChange={onChange}
								value={values.roomRates}
								required
							/>
						</div>

						<div>
							<label className='input-label basis-1/2' htmlFor='noOfDays'>
								No of Days
							</label>

							<input
								id='outlined-basic'
								type='search'
								className='mr-4 tailwind-text-box w-[100%]'
								name='noOfDays'
								onChange={onChange}
								value={values.noOfDays}
								required
							/>
						</div>

						<div>
							<label className='input-label basis-1/2' htmlFor='roomNumber'>
								Room Number
							</label>

							<input
								id='outlined-basic'
								type='search'
								className='mr-4 tailwind-text-box w-[100%]'
								name='roomNumber'
								onChange={onChange}
								value={values.roomNumber}
								required
							/>
						</div>
					</div>
					{/* right section of the flex */}
					<div className='flex-1 ml-4'>
						<div>
							<label className='input-label basis-1/2' htmlFor='totalCharges'>
								Total Charges
							</label>

							<input
								id='outlined-basic'
								type='search'
								className='mr-4 tailwind-text-box w-[100%]'
								name='totalCharges'
								onChange={onChange}
								value={values.totalCharges}
								required
							/>
						</div>

						<div>
							<label className='input-label basis-1/2' htmlFor='roomType'>
								Room Type
							</label>

							<input
								id='outlined-basic'
								type='search'
								className='mr-4 tailwind-text-box w-[100%]'
								name='roomType'
								onChange={onChange}
								value={values.roomType}
								required
							/>
						</div>

						<div>
							<label className='input-label basis-1/2' htmlFor='payee'>
								Payee
							</label>

							<input
								id='outlined-basic'
								type='search'
								className='mr-4 tailwind-text-box w-[100%]'
								name='payee'
								onChange={onChange}
								value={values.payee}
								required
							/>
						</div>

						{/* have to implement some checkboxes */}
					</div>
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

export default Accommodation;
