import React from 'react';

function VenueCard() {
	return (
		<div
			tabIndex={0}
			className='border collapse collapse-arrow border-base-300 bg-base-100 rounded-box'
		>
			<div className='text-xl font-medium collapse-title'>
				Focus me to see content
			</div>
			<div className='collapse-content'>
				<p>tabIndex={0} attribute is necessary to make the div focusable</p>
			</div>
		</div>
	);
}

export default VenueCard;
