import { useState } from 'react';
import IVenueMaster from '../../../../types/sedu/IVenueMaster';
import { TbEditCircle } from 'react-icons/tb';
import EditVenue from './EditVenue';
import FacilityShow from './FacilityShow';
function VenueCard(data: IVenueMaster) {
	const [openEdit, setOpenEdit] = useState<boolean>(false);

	return (
		<>
			<div className='mb-2 overflow-hidden border rounded-box collapse collapse-arrow border-sky-100 bg-base-100'>
				<input type='checkbox' className='peer' />
				<div className='flex items-center bg-sky-100 collapse-title'>
					<li className='flex-1 text-sm'>Id : {data.venueId}</li>
					<li className='flex-1 text-sm'>Name : {data.venueName}</li>
					<li className='flex-1 text-sm'>Type : {data.type}</li>
					<li className='flex-1 text-sm'>Availability : {data.availability}</li>
					<li className='flex-1 text-sm'>Capacity : {data.capacity}</li>
					<div
						className='p-1 rounded-full cursor-pointer bg-sky-300 hover:bg-sky-400 tooltip tooltip-right'
						data-tip='Edit'
						onClick={() => {
							setOpenEdit((val) => !val);
						}}
					>
						<TbEditCircle className='w-6 h-6' />
					</div>
					{/* Focus me to see content */}
				</div>
				<div className='flex justify-around px-20 collapse-content'>
					<div className='mt-2'>
						<p>Details</p>
						<li className='flex-1 mt-2 text-sm'>Id : {data.venueId}</li>
						<li className='flex-1 mt-2 text-sm'>Name : {data.venueName}</li>
						<li className='flex-1 mt-2 text-sm'>Type : {data.type}</li>
						<li className='flex-1 mt-2 text-sm'>
							Availability : {data.availability}
						</li>
						<li className='flex-1 mt-2 text-sm'>Capacity : {data.capacity}</li>
					</div>
					<div className='mt-2'>
						<p>Facilities</p>
						<ul>
							{data.facilities.map((f) => (
								<li>
									<FacilityShow id={f.facilityId} name={f.name} />
								</li>
							))}
						</ul>
					</div>
					<div className='mt-2'>
						<p>Charges</p>
						<ul>
							{data.charges.map((c) => (
								<li>
									<FacilityShow id={c.chargeId} name={c.name} />
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>

			{openEdit ? <EditVenue setOpenEdit={setOpenEdit} data={data} /> : <></>}
		</>
	);
}

export default VenueCard;
