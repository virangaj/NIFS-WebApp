import { Route, Routes } from 'react-router-dom';
import { RouteName } from '../../constant/routeNames';
import AdminResignationReq from './AdminAdmin/AdminResignationReq';
import AdminPages from '../../layout/AdminPages';
import { DirectorSideNavbar } from '../../constant/SideNavData';
import AddProjects from './sharedDashboards/AddProjects';
import Projects from './sharedDashboards/Projects';
import DirectorResignationReq from './DirectorDashbaord/DirectorResignationReq';
import DirectorContractExtension from './DirectorDashbaord/DirectorContractExtension';
import FundingSource from './sharedDashboards/FundingSource';

export function PageRoutes() {
	return (
		<Routes>
			<Route
				path={RouteName.DirectorResignationReq}
				element={<DirectorResignationReq />}
			/>
			<Route
				path={RouteName.ContractExtension}
				element={<DirectorContractExtension />}
			/>
			<Route path={RouteName.Projects} element={<Projects />} />
			<Route path={RouteName.FundingSource} element={<FundingSource />} />
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
