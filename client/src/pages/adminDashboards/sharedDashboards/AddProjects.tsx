import { useState } from 'react';
import InputFileds from '../../../components/InputFileds';
import EmployeeSelector from '../../../components/shared/EmployeeSelector';
import { Stack } from '@mui/material';
import LocationSelector from '../../../components/shared/LocationSelector';
import ProjectService from '../../../services/common/ProjectService';
import { useAppSelector } from '../../../hooks/hooks';
import { toast } from 'react-toastify';

const initialState = {
	projectId: '',
	projectName: '',
	description: '',
	remark: '',
	location: '',
};

function AddProjects() {
	const [values, setValues] = useState(initialState);
	const { auth } = useAppSelector((state) => state.persistedReducer);
	const onChange = (e: any) => {
		setValues((preState) => ({
			...preState,
			[e.target.name]: e.target.value,
		}));
	};

	const resetForm = () => {
		setValues(initialState);
	};

	const onSubmit = async (e: any) => {
		e.preventDefault();
		console.log(values);

		const data = {
			data: values,
			token: auth?.user?.token,
		};

		ProjectService.createProject(data).then((res) => {
			if (res) {
				toast.success('Project is successfully created!');
			} else {
				toast.error('Requset cannot be completed!');
			}
		});
	};

	return (
		<>
			<h2 className='text-xl font-bold'>Add New Project</h2>
			<div className='w-[60%] mx-auto pb-10 admin-form'>
				<form onSubmit={onSubmit}>
					<InputFileds
						onChange={onChange}
						value={values.projectName}
						name={'projectName'}
						label={'Project Name'}
					/>
					<InputFileds
						onChange={onChange}
						value={values.description}
						name={'description'}
						label={'Description'}
					/>
					<LocationSelector
						onChange={onChange}
						value={values.location}
						name={'location'}
					/>
					<label className='input-label' htmlFor='epfNo'>
						Remark
					</label>
					<EmployeeSelector
						onChange={onChange}
						value={values.remark}
						name={'remark'}
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

export default AddProjects;
