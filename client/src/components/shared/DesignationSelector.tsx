import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/hooks';
import { getAllDivisions } from '../../feature/admin/DivisionSlice';
import IDivisionData from '../../types/admin/IDivisionData';
import TextBoxLabel from './TextBoxLabel';
import IDesignationData from '../../types/admin/IDesignationData';
import { getAllDesignations } from '../../feature/admin/DesignationSlice';
import Ripple from '../Ripple';
function DesignationSelector({ onChange, tenant, name }: any) {
	const dispatch = useDispatch<any>();

	const { designation, designationIsLoading, designationIsSuccess } =
		useAppSelector((state) => state.designation);
	useEffect(() => {
		retreiveDesignations();
	}, []);

	//get all designations
	const retreiveDesignations = () => {
		dispatch(getAllDesignations());
	};

	return (
		<>
			<TextBoxLabel name='Select Designation' />
			<select
				className='tailwind-text-box'
				onChange={onChange}
				value={tenant}
				name={name}
			>
				<option defaultValue=''>Select Designation</option>

				{designation ? (
					designation.map((d: IDesignationData, i: number) => (
						<option value={d.designationId} key={i}>
							{d.designationName}
						</option>
					))
				) : (
					<>
						<Ripple />
					</>
				)}
			</select>
		</>
	);
}

export default DesignationSelector;
