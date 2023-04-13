import React from 'react';

function HomeMainNavCard({ title, img }: any) {
	return (
		<div>
			<img src={img} alt='links' />
			<p>{title}</p>
		</div>
	);
}

export default HomeMainNavCard;
