import { Route, Routes } from "react-router-dom";
import { RouteName } from "../../constant/routeNames";
import AdminPages from "../../layout/AdminPages";
import { HODSideNavbar } from "../../constant/SideNavData";
import Projects from "./sharedDashboards/Projects";
import { useAppSelector } from "../../hooks/hooks";

import HODResignationReq from "./hodDashboards/HODResignationReq";
import HODContractextensionReq from "./hodDashboards/HODContractextensionReq";
import FundingSource from "./sharedDashboards/FundingSource";

export function PageRoutes() {
  return (
    <Routes>
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
    </Routes>
  );
}

function HodDashbaord() {
  const { auth } = useAppSelector((state) => state.persistedReducer);

  return (
    <>
      <AdminPages
        Sidebardata={HODSideNavbar}
        Content={PageRoutes}
        Route={auth?.division}
      />
    </>
  );
}

export default HodDashbaord;
