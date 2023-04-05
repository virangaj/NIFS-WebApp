import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/hooks';
import { getAllEmployees } from '../../feature/admin/EmployeeSlice';
import Ripple from '../Ripple';
import IEmployeeData from '../../types/admin/IEmployeeData';
import TextBoxLabel from './TextBoxLabel';

function EmployeeSelector({ onChange, value, name }: any) {
	const dispatch = useDispatch<any>();
	const [empFoundError, setEmpFoundError] = useState<boolean>(false);
	const { employees, employeesIsLoading, employeesIsSuccess } = useAppSelector(
		(state) => state.employees
	);

	useEffect(() => {
		retreiveEmployees();
	}, []);
	useEffect(() => {
		let employee = employees.find(
			(emp: IEmployeeData) => emp.epfNo.toString() === value.toString()
		);

		if (employee) {
			setEmpFoundError(false);
		} else {
			setEmpFoundError(true);
		}
	}, [value]);
	//get all designations
	const retreiveEmployees = () => {
		dispatch(getAllEmployees());
	};

	return (
		<>
			<div className='flex items-center w-full mt-4'>
				<div>
					<label className='input-label' htmlFor='epfNo'>
						Employee EPF No
					</label>
					{/*  */}
					<input
						id={name}
						type='text'
						className='tailwind-text-box'
						onChange={onChange}
						name={name}
						value={value}
					/>
				</div>
				<div className='ml-10'>
					<TextBoxLabel name='Select Employee' />
					<select
						className='w-full tailwind-text-box'
						onChange={onChange}
						value={value}
						name={name}
					>
						<option disabled value={0}>
							Select Employee
						</option>

						{employees ? (
							employees.map((d: IEmployeeData, i: number) => (
								<option value={d.epfNo} key={i}>
									{d.firstName + ' ' + d.lastName}
								</option>
							))
						) : (
							<>
								<Ripple />
							</>
						)}
					</select>
				</div>
			</div>
			{value && empFoundError ? (
				<p className='w-[97%] mx-auto error-text-message'>User Not Found!</p>
			) : (
				''
			)}
		</>
	);
}

export default EmployeeSelector;
