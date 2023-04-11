import React, { useEffect, useState } from 'react';
import VenueMasterService from '../../../services/sedu/VenueMasterService';
import IVenueMaster from '../../../types/sedu/IVenueMaster';
import VenueCard from './VenueAdmin/VenueCard';

function VenuesAdmin() {
	const [venueData, setVenueData] = useState<Array<IVenueMaster>>([]);

	useEffect(() => {
		VenueMasterService.getAllVenues().then((res) => {
			console.log(res.data);
			setVenueData(res.data);
		});
	}, []);

	return (
		<>
			<div className='admin-page-title'>
				<p>All Venues</p>

				<hr className='admin-horizontal-line' />
			</div>

			<div className='w-full admin-panel-flex'>
				<div className='admin-table-section'>
					<h2 className='text-lg font-bold'>Venus</h2>

					<VenueCard />
				</div>
			</div>
		</>
	);
}

export default VenuesAdmin;
