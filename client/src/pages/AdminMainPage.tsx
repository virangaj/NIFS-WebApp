import SecondaryNavbar from "../components/shared/SecondaryNavbar";
import Pages from "../components/data/AdminNavData.json";

import Dots from "../images/dots_circle_b.png";
import { Route, Routes } from "react-router-dom";
import { RouteName } from "../constant/routeNames";
import ContractExtension from "./admin/ContractExtension";
import ResignationRequest from "./admin/ResignationRequest";
import AnnualIncrementRequest from "./admin/AnnualIncrementRequest";
import AdministrativeReport from "./admin/AdministrativeReport";
import Accommodation from "./admin/Accommodation";
import OverseasTelephoneCharges from "./admin/OverseasTelephoneCharges";
import InsuranceClaim from "./admin/InsuranceClaim";
import ContentPage from "../layout/ContentPage";

export function PageRoutes() {
  return (
    <Routes>
      <Route
        path={RouteName.AdministrativeReport}
        element={<AdministrativeReport />}
      />
      <Route
        path={RouteName.AnnualIncrementRequest}
        element={<AnnualIncrementRequest />}
      />
      <Route
        path={RouteName.ContractExtension}
        element={<ContractExtension />}
      />
      <Route
        path={RouteName.ResignationRequest}
        element={<ResignationRequest />}
      />
      <Route
        path={RouteName.OverseasTelCahrges}
        element={<OverseasTelephoneCharges />}
      />
      <Route path={RouteName.InsuranceClaims} element={<InsuranceClaim />} />
      <Route path={RouteName.Accommodation} element={<Accommodation />} />
    </Routes>
  );
}

function AdminMainPage() {
  return (
    <>
      <ContentPage Pages={Pages} Content={PageRoutes} />
    </>
  );
}

export default AdminMainPage;
