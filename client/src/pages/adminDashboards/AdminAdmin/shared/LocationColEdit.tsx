import { useState, useEffect } from 'react';
import ILocationData from '../../../../types/ILocationData';

function LocationColEdit({ params, setValues, locationData }: any) {
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [deleteLoading, setDeleteLoadng] = useState(false);
	const [deleteConfirm, setDeleteConfirm] = useState(false);

	const { empCatId, description, locationId, otRate } = params.row;

	const onChange = (e: any) => {
		setValues((preState: any) => ({
			...preState,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<div>
			<select
				className='tailwind-text-box'
				value={locationId}
				id='location'
				name='locationId'
				onChange={onChange}
			>
				<option disabled value=''>
					Select Location
				</option>
				{locationData?.map((l: ILocationData, i: number) => {
					return (
						<option key={i} value={l.locationId}>
							{l.locationName}
						</option>
					);
				})}
			</select>
		</div>
	);
}

export default LocationColEdit;
