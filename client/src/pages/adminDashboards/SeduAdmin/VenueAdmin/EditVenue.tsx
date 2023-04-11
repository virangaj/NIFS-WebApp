import React, { useEffect, useState } from 'react';
import IVenueMaster from '../../../../types/sedu/IVenueMaster';

function EditVenue({ setOpenEdit }: any, data: IVenueMaster) {
	const [venueData, setVenueData] = useState<IVenueMaster>();

	useEffect(() => {
		setVenueData({
			venueId: data.venueId,
			venueName: data.venueName,
			type: data.type,
			availability: data.availability,
			location: data.location,
			remark: data.remark,
			capacity: data.capacity,
			createdOn: data.createdOn,
			modifiedOn: data.modifiedOn,
			createdBy: data.createdBy,
			modifiedBy: data.modifiedBy,
			charges: [],
			facilities: [],
		});
	}, [data]);

	return (
		<div className='absolute top-0 left-0 z-50 w-full h-full bg-gray-300/50 backdrop-blur-sm'>
			<div className='relative w-[80%] bg-white rounded-lg p-10 mx-auto top-10'>
				<label
					onClick={() => {
						setOpenEdit((val: boolean) => !val);
					}}
					className='absolute btn btn-sm btn-circle right-2 top-2'
				>
					✕
				</label>

				<p className='text-lg font-semibold'>Edit Venue</p>

				<hr className='admin-horizontal-line' />
			</div>
		</div>
	);
}

export default EditVenue;
