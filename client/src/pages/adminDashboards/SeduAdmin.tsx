import { Route, Routes } from 'react-router-dom';
import { RouteName } from '../../constant/routeNames';
import AdminPages from '../../layout/AdminPages';
import { SeduAdminSideNavbar } from '../../constant/SideNavData';
import Chargers from './SeduAdmin/charges/Chargers';
import Facilities from './SeduAdmin/facilities/Facilities';
import VenuesAdmin from './SeduAdmin/VenuesAdmin';
import Projects from './sharedDashboards/Projects';
import HODResignationReq from './hodDashboards/HODResignationReq';
import HODContractextensionReq from './hodDashboards/HODContractextensionReq';
import FundingSource from './sharedDashboards/FundingSource';
import EventRequestAdmin from './SeduAdmin/EventRequestAdmin';

export function PageRoutes() {
	return (
		<Routes>
			<Route path={RouteName.Facilities} element={<Facilities />} />
			<Route path={RouteName.Charges} element={<Chargers />} />
			<Route path={RouteName.VenueMaster} element={<VenuesAdmin />} />
			<Route path={RouteName.Projects} element={<Projects />} />
			<Route
				path={RouteName.ResignationRequest}
				element={<HODResignationReq />}
			/>
			<Route
				path={RouteName.ContractExtension}
				element={<HODContractextensionReq />}
			/>
			<Route path={RouteName.FundingSource} element={<FundingSource />} />
			<Route
				path={RouteName.SeduEventRequest}
				element={<EventRequestAdmin />}
			/>
		</Routes>
	);
}

function SeduAdmin() {
	return (
		<div>
			<AdminPages
				Sidebardata={SeduAdminSideNavbar}
				Content={PageRoutes}
				Route='sedu'
			/>
		</div>
	);
}

export default SeduAdmin;
