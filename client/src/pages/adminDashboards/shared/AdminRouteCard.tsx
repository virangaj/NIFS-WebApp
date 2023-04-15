import React from 'react';
import { Link } from 'react-router-dom';

function AdminRouteCard({ subpages, Route }: any) {
	console.log(subpages);
	return (
		<div className='flex justify-center w-full'>
			{subpages?.map((page: any, i: number) => (
				<Link to={`/dashboard/${Route}/admin${page.link}`}>
					<div className='!mx-10 text-center rounded-box text-gray-600 nav-link hover:text-blue-400'>
						<page.icon className='w-8 h-8 mx-auto' />
						{page.title}
					</div>
				</Link>
			))}
		</div>
	);
}

export default AdminRouteCard;
