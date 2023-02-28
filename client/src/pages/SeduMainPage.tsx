import { Route, Routes } from 'react-router-dom';

import AttendanceFeedback from './sedu/AttendanceFeedback';
import EventRequest from './sedu/EventRequest';
import MaterialSearch from './sedu/MaterialSearch';
import ParticipantMaster from './sedu/ParticipantMaster';
import ProjectProposal from './sedu/ProjectProposal';
import QuickResponseCode from './sedu/QuickResponseCode';
import SeduBooking from './sedu/SeduBooking';
import SeduReportGenerator from './sedu/SeduReportGenerator';
import UpdateEventMaterial from './sedu/UpdateEventMaterial';
import VenueMaster from './sedu/VenueMaster';
import SecondaryNavbar from '../components/shared/SecondaryNavbar';

//pages data set
import Pages from '../components/data/SeduNavData.json';
import { RouteName } from '../constant/routeNames';

import Dots from '../images/dots_circle_b.png';

// sedu main page where all other section of sedu department can be access from here
function SeduMainPage() {
	// console.log(Pages);

	return (
		<div className='body-content min-h-[80vh]'>
			<SecondaryNavbar pages={Pages} />

			<div className='fixed w-[400px] top-[-100px] right-[-100px] -z-10'>
				<img src={Dots} alt='Dots' />
			</div>

			<Routes>
				<Route path={RouteName.SeduVenueMaster} element={<VenueMaster />} />
				<Route
					path={RouteName.SeduParticipantMaster}
					element={<ParticipantMaster />}
				/>
				<Route path={RouteName.SeduBooking} element={<SeduBooking />} />
				<Route path={RouteName.SeduEventRequest} element={<EventRequest />} />
				<Route
					path={RouteName.SeduAttendanceFeedback}
					element={<AttendanceFeedback />}
				/>
				<Route
					path={RouteName.SeduUpdateMaterial}
					element={<UpdateEventMaterial />}
				/>
				<Route
					path={RouteName.SeduQuickResponse}
					element={<QuickResponseCode />}
				/>
				<Route
					path={RouteName.SeduProjectProposal}
					element={<ProjectProposal />}
				/>
				<Route
					path={RouteName.SeduMaterialSearch}
					element={<MaterialSearch />}
				/>
				<Route
					path={RouteName.SeduReportGenerator}
					element={<SeduReportGenerator />}
				/>
			</Routes>
		</div>
	);
}

export default SeduMainPage;
