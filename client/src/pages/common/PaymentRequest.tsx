import React, { useEffect, useState } from 'react';
import IPaymentRequest from '../../types/common/IPaymentRequest';
import IEmployeeData from '../../types/admin/IEmployeeData';
import { useAppSelector } from '../../hooks/hooks';
import { generateID } from '../../utils/generateId';
import PaymentRequestService from '../../services/common/PaymentRequestService';
import { toast } from 'react-toastify';
import Box from '@mui/material/Box';
import EmployeeSelector from '../../components/shared/EmployeeSelector';
import DesignationSelector from '../../components/shared/DesignationSelector';
import DivisionSelector from '../../components/shared/DivisionSelector';
import { Stack } from '@mui/material';
import CustomeDataPicker from '../../components/DataPicker';
import { RequestStatus } from '../../constant/requestStatus';

const initialState: IPaymentRequest = {
	// generated
	documentNo: '',
	epfNo: 0,
	hod: 0,
	designationId: '',
	divisionId: '',
	date: '',

	description: '',
	remark: '',
	grossAmount: 0,
	friegthCharge: 0,
	clearingCharge: 0,
	directorGeneralCharge: 0,
	customCharge: 0,
	courierCharge: 0,
	airLineCharge: 0,
	handlingCharge: 0,
	insurance: 0,
	otherCharge: 0,

	hodApproved: RequestStatus.PENDING,
	dirApproved: RequestStatus.PENDING,
};

const PaymentRequest = () => {
	const [values, setValues] = useState<IPaymentRequest>(initialState);
	const [loading, setLoading] = useState(false);
	const [hod, setHod] = useState<IEmployeeData | null>();
	const [getDocNo, setDocNo] = useState<String | any>('');
	const [requestDate, setRequestDate] = React.useState<string | null>(null);

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
			const result = PaymentRequestService.savePaymentRequest(
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
				toast.success('Payment Request Added Successfully');
				resetForm();
			} else {
				toast.error('Request Cannot be Completed');
			}
			setLoading(false);
		}, 1000);
	};

	return (
		<div className='sub-body-content xl:!w-[60%]'>
			<h1 className='page-title'>Payment Request</h1>
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

				<div className='w-[97%] mx-auto mb-4'>
					<CustomeDataPicker
						date={requestDate}
						setDate={setRequestDate}
						title='Request Date'
						name='requestDate'
					/>
				</div>
				<div className='flex w-[97%] mx-auto'>
					{/* left section of the flex */}
					<div className='flex-1 mr-4'>
						<div>
							<label className='input-label basis-1/2' htmlFor='description'>
								Description:
							</label>

							<input
								id='outlined-basic'
								type='search'
								className='mr-4 tailwind-text-box w-[100%]'
								name='description'
								onChange={onChange}
								value={values.description}
								required
							/>
						</div>

						<div>
							<label className='input-label basis-1/2' htmlFor='grossAmount'>
								Gross Amount:
							</label>

							<input
								id='outlined-basic'
								type='search'
								className='mr-4 tailwind-text-box w-[100%]'
								name='grossAmount'
								onChange={onChange}
								value={values.grossAmount}
								required
							/>
						</div>

						<div>
							<label className='input-label basis-1/2' htmlFor='clearingCharge'>
								Clearing Charge:
							</label>

							<input
								id='outlined-basic'
								type='search'
								className='mr-4 tailwind-text-box w-[100%]'
								name='clearingCharge'
								onChange={onChange}
								value={values.clearingCharge}
								required
							/>
						</div>

						<div>
							<label className='input-label basis-1/2' htmlFor='customCharge'>
								Custom Charge:
							</label>

							<input
								id='outlined-basic'
								type='search'
								className='mr-4 tailwind-text-box w-[100%]'
								name='customCharge'
								onChange={onChange}
								value={values.customCharge}
								required
							/>
						</div>

						<div>
							<label className='input-label basis-1/2' htmlFor='airLineCharge'>
								AirLine Charge:
							</label>

							<input
								id='outlined-basic'
								type='search'
								className='mr-4 tailwind-text-box w-[100%]'
								name='airLineCharge'
								onChange={onChange}
								value={values.airLineCharge}
								required
							/>
						</div>

						<div>
							<label className='input-label basis-1/2' htmlFor='insurance'>
								Insurance:
							</label>

							<input
								id='outlined-basic'
								type='search'
								className='mr-4 tailwind-text-box w-[100%]'
								name='insurance'
								onChange={onChange}
								value={values.insurance}
								required
							/>
						</div>
					</div>

					{/* right section of the flex */}
					<div className='flex-1 mr-4'>
						<div>
							<label className='input-label basis-1/2' htmlFor='remark'>
								Remark:
							</label>

							<input
								id='outlined-basic'
								type='search'
								className='mr-4 tailwind-text-box w-[100%]'
								name='remark'
								onChange={onChange}
								value={values.remark}
								required
							/>
						</div>

						<div>
							<label className='input-label basis-1/2' htmlFor='friegthCharge'>
								Friegth Charge:
							</label>

							<input
								id='outlined-basic'
								type='search'
								className='mr-4 tailwind-text-box w-[100%]'
								name='friegthCharge'
								onChange={onChange}
								value={values.friegthCharge}
								required
							/>
						</div>

						<div>
							<label
								className='input-label basis-1/2'
								htmlFor='directorGeneralCharge'
							>
								directorGeneralCharge:
							</label>

							<input
								id='outlined-basic'
								type='search'
								className='mr-4 tailwind-text-box w-[100%]'
								name='directorGeneralCharge'
								onChange={onChange}
								value={values.directorGeneralCharge}
								required
							/>
						</div>

						<div>
							<label className='input-label basis-1/2' htmlFor='courierCharge'>
								Courier Charge:
							</label>

							<input
								id='outlined-basic'
								type='search'
								className='mr-4 tailwind-text-box w-[100%]'
								name='courierCharge'
								onChange={onChange}
								value={values.courierCharge}
								required
							/>
						</div>

						<div>
							<label className='input-label basis-1/2' htmlFor='handlingCharge'>
								Handling Charge:
							</label>

							<input
								id='outlined-basic'
								type='search'
								className='mr-4 tailwind-text-box w-[100%]'
								name='handlingCharge'
								onChange={onChange}
								value={values.handlingCharge}
								required
							/>
						</div>

						<div>
							<label className='input-label basis-1/2' htmlFor='otherCharge'>
								Other Charge:
							</label>

							<input
								id='outlined-basic'
								type='search'
								className='mr-4 tailwind-text-box w-[100%]'
								name='otherCharge'
								onChange={onChange}
								value={values.otherCharge}
								required
							/>
						</div>
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
};

export default PaymentRequest;
