import { Route, Routes } from "react-router-dom";
import { RouteName } from "../../constant/routeNames";
import AdminResignationReq from "./AdminAdmin/AdminResignationReq";
import AdminPages from "../../layout/AdminPages";
import { DirectorSideNavbar } from "../../constant/SideNavData";
import AddProjects from "./sharedDashboards/AddProjects";
import Projects from "./sharedDashboards/Projects";
import DirectorResignationReq from "./DirectorDashbaord/DirectorResignationReq";
import DirectorContractExtension from "./DirectorDashbaord/DirectorContractExtension";
import FundingSource from "./sharedDashboards/FundingSource";
import DirectorArticleRequest from "./DirectorDashbaord/DirectorArticleRequest";
import DirectorJournalRequest from "./DirectorDashbaord/DirectorJournalRequest";
import DirectorTravelRequest from "./DirectorDashbaord/DirectorTravelRequest";
import DirectorTransportCost from "./DirectorDashbaord/DirectorTransportCost";
import DirectorSRN from "./DirectorDashbaord/DirectorSRN";
import DirectorGatePass from "./DirectorDashbaord/DirectorGatePass";
import DirectorQuotationRequest from "./DirectorDashbaord/DirectorQuotationRequest";
import DirectorQuotationSummaryRequest from "./DirectorDashbaord/DirectorQuotationSummaryRequest";
import DirectorAccomodation from "./DirectorDashbaord/DirectorAccomodation";
import DirectorInsuranceClaim from "./DirectorDashbaord/DirectorInsuranceClaim";
import DirectorAnnualIncrementRequest from "./DirectorDashbaord/DirectorAnnualIncrementRequest";
import AdminRoutePage from "./shared/AdminRoutePage";
import DirectorWorkRequest from "./DirectorDashbaord/DirectorWorkRequest";
import DirectorLeaveRequest from "./DirectorDashbaord/DirectorLeaveRequest";
import DirectorOverTime from "./DirectorDashbaord/DirectorOverTime";
import DirectorPaymentRequest from "./DirectorDashbaord/DirectorPaymentRequest";
export function PageRoutes() {
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <AdminRoutePage Sidebardata={DirectorSideNavbar} Route="director" />
        }
      />
      <Route
        path={RouteName.DirectorResignationReq}
        element={<DirectorResignationReq />}
      />
      <Route
        path={RouteName.ContractExtension}
        element={<DirectorContractExtension />}
      />

      {/* Library */}
      <Route
        path={RouteName.LibraryArticleRequest}
        element={<DirectorArticleRequest />}
      />
      <Route
        path={RouteName.LibraryJournalRequest}
        element={<DirectorJournalRequest />}
      />
      {/* Transport */}
      <Route
        path={RouteName.TransportTravelRequest}
        element={<DirectorTravelRequest />}
      />
      <Route
        path={RouteName.TransportCost}
        element={<DirectorTransportCost />}
      />

      {/* Procument */}

      <Route path={RouteName.Srn} element={<DirectorSRN />} />
      <Route path={RouteName.GatePass} element={<DirectorGatePass />} />
      <Route
        path={RouteName.QuotationRequest}
        element={<DirectorQuotationRequest />}
      />
      <Route
        path={RouteName.QuotationSummary}
        element={<DirectorQuotationSummaryRequest />}
      />

      {/* admin */}

      <Route
        path={RouteName.Accommodation}
        element={<DirectorAccomodation />}
      />

      <Route
        path={RouteName.InsuranceClaims}
        element={<DirectorInsuranceClaim />}
      />

      <Route
        path={RouteName.AnnualIncrementRequest}
        element={<DirectorAnnualIncrementRequest />}
      />

      {/* Common */}

      <Route path={RouteName.WorkRequest} element={<DirectorWorkRequest />} />

      <Route path={RouteName.LeaveRequest} element={<DirectorLeaveRequest />} />

      <Route path={RouteName.OverTime} element={<DirectorOverTime />} />

      <Route
        path={RouteName.PaymentRequest}
        element={<DirectorPaymentRequest />}
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
        Route="director"
      />
    </>
  );
}

export default DirectorAdmin;
