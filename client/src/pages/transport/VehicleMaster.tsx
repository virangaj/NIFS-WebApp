import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import CustomeDataPicker from '../../components/DataPicker';
import ITravelMaster from '../../types/transport/ITravelMaster';
import '../pages.css';
import TravelMasterService from '../../services/transport/TravelMasterService';
import { toast } from 'react-toastify';

const initialState: ITravelMaster = {
	registrationNo: '',
	chassiNo: '',
	engineNo: '',
	category: '',
	brand: '',
	color: '',
	date: '',
	assign: '',
	employee: '',
	insuranceCompanyName: '',
	insuranceExpiryDate: '',
	licenseExpiryDate: '',
	emissionTestDate: '',
	availability: '',
	remark: '',
};

function VehicleMaster() {
	const [values, setValues] = useState<ITravelMaster>(initialState);

	const [date, setDate] = useState<string | null>(null);
	const [insuranceExpiryDate, setInsuranceExpiryDate] = useState<string | null>(
		null
	);
	const [licenseExpiryDate, setLicenseExpiryDate] = useState<string | null>(
		null
	);
	const [emissionTestDate, setEmissionTestDate] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setValues({
			registrationNo: values?.registrationNo,
			chassiNo: values?.chassiNo,
			engineNo: values?.engineNo,
			category: values?.category,
			brand: values?.brand,
			color: values?.color,
			date: date ? date : '',
			assign: values?.assign,
			employee: values?.employee,
			insuranceCompanyName: values?.insuranceCompanyName,
			insuranceExpiryDate: insuranceExpiryDate ? insuranceExpiryDate : '',
			licenseExpiryDate: licenseExpiryDate ? licenseExpiryDate : '',
			emissionTestDate: emissionTestDate ? emissionTestDate : '',
			availability: values?.availability,
			remark: values?.remark,
		});
	}, [date, insuranceExpiryDate, licenseExpiryDate, emissionTestDate]);

	const resetForm = () => {
		setValues({
			registrationNo: '',
			chassiNo: '',
			engineNo: '',
			category: '',
			brand: '',
			color: '',
			date: '',
			assign: '',
			employee: '',
			insuranceCompanyName: '',
			insuranceExpiryDate: '',
			licenseExpiryDate: '',
			emissionTestDate: '',
			availability: '',
			remark: '',
		});
	};

	const onChange = (event: any) => {
		setValues((prevState) => ({
			...prevState,
			[event.target.name]: event.target.value,
		}));
	};

	const onSubmit = async (event: any) => {
		event.preventDefault();
		// console.log(values);

		if (values.registrationNo !== '') {
			setTimeout(async () => {
				const result = await TravelMasterService.saveVehicle(values);

				// console.log(result);

				if (result?.data !== null) {
					toast.success('Vehicle Details Successfully Added');
					resetForm();
				} else {
					toast.error('Request cannot completed!');
				}
				setLoading(false);
			}, 1000);
		}
	};

	return (
		<div className='sub-body-content xl:!w-[60%]'>
			<h1 className='page-title'>Transport Master</h1>
			<hr className='horizontal-line'></hr>

			<form onSubmit={onSubmit} className='w-[90%] mx-auto'>
				<div className='grid grid-cols-1 md:grid-cols-2'>
					<div className='form-left-section'>
						<div className='flex'>
							<label className='input-label basis-1/2' htmlFor='registrationNo'>
								Registration No:
							</label>

							<input
								id='outlined-basic'
								type='search'
								className='mr-4 tailwind-text-box w-[90%]'
								name='registrationNo'
								onChange={onChange}
								value={values.registrationNo}
								required
							/>
						</div>

						<div className='flex'>
							<label className='input-label basis-1/2' htmlFor='chassiNo'>
								Chassi No:
							</label>

							<input
								id='outlined-basic'
								type='search'
								className='mr-4 tailwind-text-box w-[90%]'
								name='chassiNo'
								onChange={onChange}
								value={values.chassiNo}
								required
							/>
						</div>

						<div className='flex'>
							<label className='input-label basis-1/2' htmlFor='engineNo'>
								Engine No:
							</label>

							<input
								id='outlined-basic'
								type='search'
								className='mr-4 tailwind-text-box w-[90%]'
								name='engineNo'
								onChange={onChange}
								value={values.engineNo}
								required
							/>
						</div>

						<div className='selection'>
							<label className='input-label' htmlFor='category'>
								Category:
							</label>
							<select
								className='tailwind-text-box w-[90%]'
								id='outlined-basic'
								name='category'
								onChange={onChange}
								value={values.category}
							>
								<option value='' disabled>
									Select Category:
								</option>
								<option value='Van'>Cab</option>
								<option value='Car'>Car</option>
								<option value='Lorry'>Lorry</option>
							</select>
						</div>

						<div className='selection'>
							<label className='input-label' htmlFor='Brand'>
								Brand:
							</label>
							<select
								className='tailwind-text-box w-[90%]'
								id='outlined-basic'
								name='brand'
								onChange={onChange}
								value={values.brand}
							>
								<option value={''} disabled>
									Select Brand:
								</option>
								<option value='Toyota'>Toyota</option>
								<option value='Nissan'>Nissan</option>
								<option value='Mitsubishi'>Mitsubishi</option>
							</select>
						</div>

						<div className='selection'>
							<label className='input-label' htmlFor='Color'>
								Color:
							</label>
							<select
								className='tailwind-text-box w-[90%]'
								id='outlined-basic'
								name='color'
								onChange={onChange}
								value={values.color}
							>
								<option value='' disabled>
									Select Color:
								</option>
								<option value='Red'>Red</option>
								<option value='Black'>Black</option>
								<option value='Blue'>Blue</option>
							</select>
						</div>

						<div className='selection'>
							<label className='input-label' htmlFor='availability'>
								Availability:
							</label>
							<select
								className='tailwind-text-box w-[90%]'
								id='outlined-basic'
								name='availability'
								onChange={onChange}
								value={values.availability}
							>
								<option value='' disabled>
									Select availability:
								</option>
								<option value='yes'>Yes</option>
								<option value='no'>No</option>
							</select>
						</div>

						<div className='datepicker'>
							<label className='input-label' htmlFor='emissionTestDate'>
								Emission Test Date:
							</label>
							<CustomeDataPicker
								date={emissionTestDate}
								setDate={setEmissionTestDate}
								title='Date'
								className='mx-0 lg:ml-10'
								name='emissionTestDate'
							/>
						</div>
					</div>

					{/* Form Right Section */}

					<div className='form-right-section'>
						<div>
							<label className='input-label' htmlFor='date'>
								Date:
							</label>
							<CustomeDataPicker
								date={date}
								setDate={setDate}
								title='Date'
								className='mx-0 lg:ml-10'
								name='date'
							/>
						</div>

						<div className='selection'>
							<label className='input-label' htmlFor='assign'>
								Assign / Pool:
							</label>
							<select
								className='tailwind-text-box w-[90%]'
								id='outlined-basic'
								name='assign'
								onChange={onChange}
								value={values.assign}
							>
								<option value='' disabled>
									Select Pool:
								</option>
								<option value='Red'>local</option>
								<option value='Black'>foreign</option>
							</select>
						</div>

						<div className='flex'>
							<label className='input-label basis-1/2' htmlFor='employee'>
								Employee:
							</label>

							<input
								id='outlined-basic'
								type='search'
								className='mr-4 tailwind-text-box w-[90%]'
								name='employee'
								onChange={onChange}
								value={values.employee}
								required
							/>
						</div>

						<div className='selection'>
							<label className='input-label' htmlFor='insuranceCompanyName'>
								Insurance Company Name:
							</label>
							<select
								className='tailwind-text-box w-[90%]'
								id='outlined-basic'
								name='insuranceCompanyName'
								onChange={onChange}
								value={values.insuranceCompanyName}
							>
								<option value='' disabled>
									Select Insurance Company
								</option>
								<option value='Ceylinco'>Ceylinco</option>
								<option value='AIA'>AIA Insurance</option>
								<option value='Allianz'>Allianz</option>
							</select>
						</div>

						<div className='datepicker'>
							<label className='input-label' htmlFor='insuranceExpiedDate'>
								Insurance Expiry Date:
							</label>
							<CustomeDataPicker
								date={insuranceExpiryDate}
								setDate={setInsuranceExpiryDate}
								title='Date'
								className='mx-0 lg:ml-10'
								name='insuranceExpiedDate'
							/>
						</div>

						<div className='datepicker'>
							<label className='input-label' htmlFor='licenseExpiedDate'>
								License Expired Date:
							</label>
							<CustomeDataPicker
								date={licenseExpiryDate}
								setDate={setLicenseExpiryDate}
								title='Date'
								className='mx-0 lg:ml-10'
								name='licenseExpiedDate'
							/>
						</div>
					</div>
				</div>
				<div className='flex '>
					<label className='input-label basis-1/2' htmlFor='remark'>
						Remarks:
					</label>

					<input
						id='outlined-basic'
						type='text'
						className='mr-4 tailwind-text-box w-[90%]'
						name='remark'
						onChange={onChange}
						value={values.remark}
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

export default VehicleMaster;
