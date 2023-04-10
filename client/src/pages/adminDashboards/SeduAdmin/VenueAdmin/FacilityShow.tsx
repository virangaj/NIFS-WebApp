import React from 'react';

function FacilityShow({ id, name }: any) {
	return (
		<div className='flex mt-2 text-sm'>
			<p className='mr-3'>{id}</p>
			<p>{name}</p>
		</div>
	);
}

export default FacilityShow;
