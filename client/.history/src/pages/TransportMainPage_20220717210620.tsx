import React from 'react';

import TransportNavbar from '../components/Transport/shared/TransportNavbar';
import { Route, Routes } from 'react-router-dom';
import NewRequest from '../components/Transport/NewRequest';
import RecommendedRequest from '../components/Transport/RecommendedRequest';
import ApproveRequest from '../components/Transport/ApproveRequest';

// transport main page where all other section of transport department can be access from here
function TransportMainPage() {
	return (
		<div>
			<TransportNavbar />
			<div className="sub-body-content">
				<Routes>
					<Route path="/" element={<NewRequest />} />
					<Route path="/recommend" element={<RecommendedRequest />} />
					<Route path="/approve" element={<ApproveRequest />} />
				</Routes>
			</div>
		</div>
	);
}

export default TransportMainPage;
