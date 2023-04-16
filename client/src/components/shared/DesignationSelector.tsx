import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/hooks';
import TextBoxLabel from './TextBoxLabel';
import IDesignationData from '../../types/admin/IDesignationData';
import { getAllDesignations } from '../../feature/admin/DesignationSlice';
import Ripple from '../Ripple';

function DesignationSelector({ onChange, tenant, name }: any) {
	const dispatch = useDispatch<any>();

	const { designation, designationIsLoading, designationIsSuccess } =
		useAppSelector((state) => state.designation);
	useEffect(() => {
		if (designation.length == 0 || !designationIsSuccess) {
			retreiveDesignations();
		}
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
				<option defaultValue={''} selected disabled>
					Select Designation
				</option>

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
