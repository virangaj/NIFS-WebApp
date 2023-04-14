import React from 'react';

function TableSelectEventId({ params, setSelectedData }: any) {
	const { documentNo } = params.row;
	return (
		<div
			className='ml-2 tooltip tooltip-right absolute cursor-pointer overflow-visible'
			data-tip='Click to View Details'
			onClick={() => setSelectedData(documentNo)}
		>
			{documentNo}
		</div>
	);
}

export default TableSelectEventId;
