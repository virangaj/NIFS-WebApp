import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SecondaryNavbar from '../components/shared/SecondaryNavbar';


// sedu main page where all other section of sedu department can be access from here
function SeduMainPage() {
	const pages = [
		{
			id: 0,
			title: 'Venue Master',
			link: '/transport',
			access: false

		},
		{
			id: 1,
			title: 'Participant Master',
			link: '/transport/recommend',
			access: false
		},
		{
			id: 2,
			title: 'Approve Request',
			link: '/transport/approve',
			access: false
		},
	];
	return <div>
		<SecondaryNavbar pages={pages} />
		<div className="sub-body-content">
			<Routes>
				{/* <Route path="/" element={<NewRequest />} />
					<Route path="/recommend" element={<RecommendedRequest />} />
					<Route path="/approve" element={<ApproveRequest />} /> */}
			</Routes>
		</div>
	</div>;
}

export default SeduMainPage;
