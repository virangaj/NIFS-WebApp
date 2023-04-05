import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/hooks';
import { getAllDivisions } from '../../feature/admin/DivisionSlice';
import IDivisionData from '../../types/admin/IDivisionData';
import TextBoxLabel from './TextBoxLabel';
function DivisionSelector({ onChange, tenant, name }: any) {
	const dispatch = useDispatch<any>();
	const { division, divisionIsLoading, divisionIsSuccess } = useAppSelector(
		(state) => state.division
	);
	useEffect(() => {
		retreiveDivisions();
	}, []);

	//get all divisions
	const retreiveDivisions = () => {
		dispatch(getAllDivisions());
	};
	return (
		<div>
			<TextBoxLabel name='Select Division' />
			<select
				className='tailwind-text-box'
				onChange={onChange}
				value={tenant}
				name={name}
			>
				<option defaultValue=''>Select Division</option>

				{division &&
					division.map((d: IDivisionData, i: number) => (
						<option value={d.divisionId} key={i}>
							{d.name}
						</option>
					))}
			</select>
		</div>
	);
}

export default DivisionSelector;
