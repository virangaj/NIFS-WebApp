import { Route, Routes } from 'react-router-dom';
import { RouteName } from '../../constant/routeNames';
import Employees from './AdminAdmin/Employees';
import EmployeeType from './AdminAdmin/EmployeeType';

import EmpCategory from './AdminAdmin/EmpCategory';
import Designation from './AdminAdmin/Designation';
import Division from './AdminAdmin/Division';
import AdminResignationReq from './AdminAdmin/AdminResignationReq';
import { AdministrationSidenav } from '../../constant/SideNavData';
import AdminPages from '../../layout/AdminPages';

export function PageRoutes() {
	return (
		<Routes>
			<Route path={RouteName.EmployeeType} element={<EmployeeType />} />
			<Route path={RouteName.EmployeeCategory} element={<EmpCategory />} />
			<Route path={RouteName.Employee} element={<Employees />} />
			<Route path={RouteName.Designation} element={<Designation />} />
			<Route path={RouteName.Divisions} element={<Division />} />
			<Route
				path={RouteName.ResignationRequest}
				element={<AdminResignationReq />}
			/>
		</Routes>
	);
}

function AdminAdmin() {
	return (
		<>
			{/* layout */}
			<AdminPages Sidebardata={AdministrationSidenav} Content={PageRoutes} />
		</>
	);
}

export default AdminAdmin;
