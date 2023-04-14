import { useEffect, useState } from 'react';
import TextBoxLabel from './TextBoxLabel';
import VenueMasterService from '../../services/sedu/VenueMasterService';

function VenueSelector({ onChange, value, name }: any) {
	const [venues, setVenues] = useState<Array<any>>([]);

	useEffect(() => {
		retreiveVenues();
	}, []);

	//get all locations
	const retreiveVenues = () => {
		VenueMasterService.getAllVenues().then((res) => {
			setVenues(res.data);
		});
	};
	return (
		<div>
			<TextBoxLabel name='Select Venue' />
			<select
				className='tailwind-text-box'
				onChange={onChange}
				value={value}
				name={name}
			>
				<option value='' disabled>
					Select Venue
				</option>

				{venues &&
					venues.map((v: any, i: number) => (
						<option value={v.venueId} key={i}>
							{v.venueName}
						</option>
					))}
			</select>
		</div>
	);
}

export default VenueSelector;
