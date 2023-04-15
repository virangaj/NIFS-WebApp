import React from 'react';

function EventDetailText({ title, value }: any) {
	return (
		<div className='flex w-full mb-2 text-base font-normal text-gray-600'>
			<p className='flex-1'>{title} </p>
			<p className='flex-1 font-bold'>{value}</p>
		</div>
	);
}

export default EventDetailText;
