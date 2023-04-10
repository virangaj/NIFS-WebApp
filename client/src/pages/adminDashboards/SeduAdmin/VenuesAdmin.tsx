import React, { useEffect, useState } from 'react';
import VenueMasterService from '../../../services/sedu/VenueMasterService';
import IVenueMaster from '../../../types/sedu/IVenueMaster';
import VenueCard from './VenueAdmin/VenueCard';
import Ripple from '../../../components/Ripple';

function VenuesAdmin() {
	const [venueData, setVenueData] = useState<Array<IVenueMaster>>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		setTimeout(() => {
			VenueMasterService.getAllVenues().then((res) => {
				console.log(res.data);
				setVenueData(res.data);
			});
			setLoading(false);
		}, 1000);
	}, []);

	return (
		<>
			<div className='admin-page-title'>
				<p>All Venues</p>

				<hr className='admin-horizontal-line' />
			</div>

			<div className='w-full'>
				<div className='admin-table-section'>
					{!loading ? (
						venueData && venueData.map((data) => <VenueCard {...data} />)
					) : (
						<>
							<Ripple />
						</>
					)}
				</div>
			</div>
		</>
	);
}

export default VenuesAdmin;
