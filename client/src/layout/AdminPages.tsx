import React from 'react';
import Dots from '../images/dots_circle_b.png';
import SideNavbar from '../pages/adminDashboards/AdminAdmin/SideNavbar';

function AdminPages({ Sidebardata, Content }: any) {
	return (
		<div className='body-content'>
			<div className='fixed w-[400px] top-[-100px] right-[-100px] -z-10'>
				<img src={Dots} alt='Dots' />
			</div>
			<div className='flex items-start mb-20'>
				{/* side nav bar */}
				<SideNavbar navdata={Sidebardata} />
				<div className='admin-sub-panel-body'>
					{/* routes */}
					<Content />
				</div>
			</div>
		</div>
	);
}

export default AdminPages;
