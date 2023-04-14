import { useState } from 'react';
import InputFileds from '../../../components/InputFileds';
import { Stack } from '@mui/material';
import LocationSelector from '../../../components/shared/LocationSelector';
import { useAppSelector } from '../../../hooks/hooks';
import { toast } from 'react-toastify';
import FundingSourceService from '../../../services/common/FundingSourceService';

const initialState = {
	fundingId: '',
	name: '',
	description: '',
	locationId: '',
};

function AddFundingSource() {
	const [values, setValues] = useState(initialState);
	const { auth } = useAppSelector((state) => state.persistedReducer);
	const onChange = (e: any) => {
		setValues((preState) => ({
			...preState,
			[e.target.name]: e.target.value,
		}));
	};

	//reset form
	const resetForm = () => {
		setValues(initialState);
	};
	const onSubmit = async (e: any) => {
		e.preventDefault();
		console.log(values);

		FundingSourceService.saveFundingSource(values, auth?.user?.token).then(
			(res) => {
				if (res) {
					toast.success('Funding Source is successfully created!');
				} else {
					toast.error('Requset cannot be completed!');
				}
			}
		);
	};
	return (
		<>
			<h2 className='text-xl font-bold'>Add New Funding Source</h2>
			<div className='w-[60%] mx-auto pb-10 admin-form'>
				<form onSubmit={onSubmit}>
					<InputFileds
						onChange={onChange}
						value={values.name}
						name={'name'}
						label={'Funding Source Name'}
					/>
					<InputFileds
						onChange={onChange}
						value={values.description}
						name={'description'}
						label={'Description'}
					/>
					<LocationSelector
						onChange={onChange}
						value={values.locationId}
						name={'locationId'}
					/>

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
		</>
	);
}

export default AddFundingSource;
