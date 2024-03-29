import { Route, Routes } from 'react-router-dom';
import { RouteName } from '../../constant/routeNames';
import Employees from './AdminAdmin/Employees';
import EmployeeType from './AdminAdmin/EmployeeType';

import EmpCategory from "./AdminAdmin/EmpCategory";
import Designation from "./AdminAdmin/Designation";
import Division from "./AdminAdmin/Division";
import AdminResignationReq from "./AdminAdmin/AdminResignationReq";
import { AdministrationSidenav } from "../../constant/SideNavData";
import AdminPages from "../../layout/AdminPages";
import ContractextensionReq from "./AdminAdmin/ContractextensionReq";
import FundingSource from "./sharedDashboards/FundingSource";
import AccomodationReq from "./AdminAdmin/AccomodationReq";
import InsuranceClaimReq from "./AdminAdmin/InsuranceClaimReq";
import AnnualIncrementRequest from "./AdminAdmin/AnnualIncrementRequest";
import AdminRoutePage from './shared/AdminRoutePage';
export function PageRoutes() {
  return (
    <Routes>
    <Route
    				path='/*'
    				element={
    					<AdminRoutePage Sidebardata={AdministrationSidenav} Route='admin' />
    				}
    			/>
      <Route path={RouteName.EmployeeType} element={<EmployeeType />} />
      <Route path={RouteName.EmployeeCategory} element={<EmpCategory />} />
      <Route path={RouteName.Employee} element={<Employees />} />
      <Route path={RouteName.Designation} element={<Designation />} />
      <Route path={RouteName.Divisions} element={<Division />} />
      <Route
        path={RouteName.ResignationRequest}
        element={<AdminResignationReq />}
      />
      <Route
        path={RouteName.ContractExtension}
        element={<ContractextensionReq />}
      />
      <Route path={RouteName.InsuranceClaims} element={<InsuranceClaimReq />} />
      <Route path={RouteName.Accommodation} element={<AccomodationReq />} />
      <Route
        path={RouteName.AnnualIncrementRequest}
        element={<AnnualIncrementRequest />}
      />
      <Route path={RouteName.FundingSource} element={<FundingSource />} />
    </Routes>
  );
	return (
		<Routes>
			<Route
				path='/*'
				element={
					<AdminRoutePage Sidebardata={AdministrationSidenav} Route='admin' />
				}
			/>
			<Route path={RouteName.EmployeeType} element={<EmployeeType />} />
			<Route path={RouteName.EmployeeCategory} element={<EmpCategory />} />
			<Route path={RouteName.Employee} element={<Employees />} />
			<Route path={RouteName.Designation} element={<Designation />} />
			<Route path={RouteName.Divisions} element={<Division />} />
			<Route
				path={RouteName.ResignationRequest}
				element={<AdminResignationReq />}
			/>
			<Route
				path={RouteName.ContractExtension}
				element={<ContractextensionReq />}
			/>
			<Route path={RouteName.FundingSource} element={<FundingSource />} />
		</Routes>
	);
}

function AdminAdmin() {
	return (
		<>
			{/* layout */}
			<AdminPages
				Sidebardata={AdministrationSidenav}
				Content={PageRoutes}
				Route='admin'
			/>
		</>
	);
}

export default AdminAdmin;
