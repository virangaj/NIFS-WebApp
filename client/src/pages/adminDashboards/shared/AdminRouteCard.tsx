import React from 'react';
import { Link } from 'react-router-dom';

function AdminRouteCard({ subpages, Route }: any) {
	console.log(subpages);
	return (
		<div className='flex flex-wrap justify-center w-full'>
			{subpages?.map((page: any, i: number) => (
				<Link to={`/dashboard/${Route}/admin${page.link}`} key={i}>
					<div className='!mx-10 text-center rounded-box text-gray-600 nav-link hover:text-blue-400 !pt-4'>
						<page.icon className='w-8 h-8 mx-auto text-blue-400' />
						<p className='mt-2 font-bold'>{page.title}</p>
					</div>
				</Link>
			))}
		</div>
	);
}

export default AdminRouteCard;
