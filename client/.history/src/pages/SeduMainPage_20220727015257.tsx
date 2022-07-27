import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ParticipantMaster from '../components/sedu/shared/ParticipantMaster';
import SeduBooking from '../components/sedu/shared/SeduBooking';
import SeduSecondaryNavbar from '../components/sedu/shared/SeduSecondaryNavbar';
import VenueMaster from '../components/sedu/VenueMaster';
import SecondaryNavbar from '../components/shared/SecondaryNavbar';


// sedu main page where all other section of sedu department can be access from here
function SeduMainPage() {

	return <div>
		<SeduSecondaryNavbar />
		<div className="sub-body-content">
			<Routes>
				<Route path="/venue-master" element={<VenueMaster />} />
				<Route path="/participant-master" element={<ParticipantMaster />} />
				<Route path="/booking" element={<SeduBooking />} />
			</Routes>
		</div>
	</div>;
}

export default SeduMainPage;
