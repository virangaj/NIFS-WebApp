import React from 'react';
import AdminRouteCard from './AdminRouteCard';

function AdminRoutePage({ Sidebardata, Route }: any) {
	console.log(Sidebardata);
	return (
		<div className='h-[600px] body-content'>
			{Sidebardata?.map((data: any, i: number) => (
				<div key={i}>
					<AdminRouteCard subpages={data?.subpages} Route={Route} />
					<div className='!mb-20 text-center text-white nav-title-section'>
						{data.title}
					</div>
				</div>
			))}
		</div>
	);
}

export default AdminRoutePage;
