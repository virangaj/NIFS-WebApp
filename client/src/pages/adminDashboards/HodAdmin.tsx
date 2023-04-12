import { Route, Routes } from 'react-router-dom';
import { RouteName } from '../../constant/routeNames';
import AdminPages from '../../layout/AdminPages';
import { HODAdminSideNavbar } from '../../constant/SideNavData';
import Chargers from './SeduAdmin/charges/Chargers';
import Facilities from './SeduAdmin/facilities/Facilities';
import VenuesAdmin from './SeduAdmin/VenuesAdmin';

export function PageRoutes() {
	return (
		<Routes>
			<Route path={RouteName.Facilities} element={<Facilities />} />
			<Route path={RouteName.Charges} element={<Chargers />} />
			<Route path={RouteName.VenueMaster} element={<VenuesAdmin />} />
		</Routes>
	);
}

function HodAdmin() {
	return (
		<div>
			<AdminPages
				Sidebardata={HODAdminSideNavbar}
				Content={PageRoutes}
				Route='sedu'
			/>
		</div>
	);
}

export default HodAdmin;
