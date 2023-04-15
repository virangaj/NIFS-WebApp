import { Route, Routes } from "react-router-dom";
import { RouteName } from "../../constant/routeNames";
import AdminPages from "../../layout/AdminPages";
import { HODSideNavbar } from "../../constant/SideNavData";
import Projects from "./sharedDashboards/Projects";
import { useAppSelector } from "../../hooks/hooks";

import HODResignationReq from "./hodDashboards/HODResignationReq";
import HODContractextensionReq from "./hodDashboards/HODContractextensionReq";
import FundingSource from "./sharedDashboards/FundingSource";
import HODTravelRequest from "./hodDashboards/HODTravelRequest";
import HODTransportCost from "./hodDashboards/HODTransportCost";
import HODArticleRequest from "./hodDashboards/HODArticleRequest";
import HODJournalRequest from "./hodDashboards/HODJournalRequest";
import HODGatePass from "./hodDashboards/HODGatePass";
import HODQuotationRequest from "./hodDashboards/HODQuotationRequest";
import HODQuotationSummary from "./hodDashboards/HODQuotationSummary";
import HODSrn from "./hodDashboards/HODSrn";
import HODAccomodation from "./hodDashboards/HODAccomodation";
import HODInsuranceClaim from "./hodDashboards/HODInsuranceClaim";
import HODAnnualIncrementRequest from "./hodDashboards/HODAnnualIncrementRequest";
import AdminRoutePage from './shared/AdminRoutePage';
export function PageRoutes() {
onst { auth } = useAppSelector((state) => state.persistedReducer);
  return (
    <Routes>
    <Route
    				path='/*'
    				element={
    					<AdminRoutePage Sidebardata={HODSideNavbar} Route={auth?.division} />
    				}
    			/>
      <Route path={RouteName.Projects} element={<Projects />} />
      <Route
        path={RouteName.ResignationRequest}
        element={<HODResignationReq />}
      />
      <Route
        path={RouteName.ContractExtension}
        element={<HODContractextensionReq />}
      />
      <Route
        path={RouteName.TransportTravelRequest}
        element={<HODTravelRequest />}
      />
      <Route
        path={RouteName.LibraryArticleRequest}
        element={<HODArticleRequest />}
      />
      <Route
        path={RouteName.LibraryJournalRequest}
        element={<HODJournalRequest />}
      />

      <Route path={RouteName.GatePass} element={<HODGatePass />} />
      <Route
        path={RouteName.QuotationRequest}
        element={<HODQuotationRequest />}
      />
      <Route
        path={RouteName.QuotationSummary}
        element={<HODQuotationSummary />}
      />

      {/* admin */}
      <Route path={RouteName.Accommodation} element={<HODAccomodation />} />
      <Route path={RouteName.InsuranceClaims} element={<HODInsuranceClaim />} />
      <Route
        path={RouteName.AnnualIncrementRequest}
        element={<HODAnnualIncrementRequest />}
      />

      <Route path={RouteName.Srn} element={<HODSrn />} />

			<Route path={RouteName.TransportCost} element={<HODTransportCost />} />
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
