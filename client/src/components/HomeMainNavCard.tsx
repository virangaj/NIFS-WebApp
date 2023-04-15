import React from 'react';

function HomeMainNavCard({ title, img }: any) {
	return (
		<div className='w-32 h-32 p-2 !mx-10 text-center rounded-box nav-link'>
			<img src={img} alt='links' className='mx-auto mt-2' />
			<p className='mt-4 text-lg font-bold'>{title}</p>
		</div>
	);
}

export default HomeMainNavCard;
