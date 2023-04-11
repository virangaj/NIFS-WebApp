import { Route, Routes } from 'react-router-dom';
import { RouteName } from '../../constant/routeNames';
import AdminResignationReq from './AdminAdmin/AdminResignationReq';
import AdminPages from '../../layout/AdminPages';
import { DirectorSideNavbar } from '../../constant/SideNavData';
import AddProjects from './sharedDashboards/AddProjects';
import Projects from './sharedDashboards/Projects';

export function PageRoutes() {
	return (
		<Routes>
			<Route
				path={RouteName.DirectorResignationReq}
				element={<AdminResignationReq />}
			/>
			<Route path={RouteName.Projects} element={<Projects />} />
		</Routes>
	);
}

function DirectorAdmin() {
	return (
		<>
			<AdminPages
				Sidebardata={DirectorSideNavbar}
				Content={PageRoutes}
				Route='director'
			/>
		</>
	);
}

export default DirectorAdmin;
