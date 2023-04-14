import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/hooks';
import TextBoxLabel from './TextBoxLabel';
import { getAllLocations } from '../../feature/admin/LocationSlice';

function LocationSelector({ onChange, value, name }: any) {
	const dispatch = useDispatch<any>();
	const { location, locationIsLoading, locationIsSuccess } = useAppSelector(
		(state) => state.location
	);
	useEffect(() => {
		if (location.length == 0 || !locationIsSuccess) {
			retreiveLocations();
		}
	}, []);

	//get all locations
	const retreiveLocations = () => {
		dispatch(getAllLocations());
	};
	return (
		<div>
			<TextBoxLabel name='Select Location' />
			<select
				className='tailwind-text-box'
				onChange={onChange}
				value={value}
				name={name}
			>
				<option value='' disabled>
					Select Location
				</option>

				{location &&
					location.map((l: any, i: number) => (
						<option value={l.locationId} key={i}>
							{l.locationName}
						</option>
					))}
			</select>
		</div>
	);
}

export default LocationSelector;
