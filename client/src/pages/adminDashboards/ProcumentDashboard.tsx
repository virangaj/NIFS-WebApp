import React from "react";
import { Route, Routes } from "react-router-dom";
import { RouteName } from "../../constant/routeNames";
import ProcumentSRN from "./procumentDashboard/ProcumentSRN";
import ProcumentGatePass from "./procumentDashboard/ProcumentGatePass";
import ProcumentQuotationRequest from "./procumentDashboard/ProcumentQuotationRequest";
import QuotationSummary from "../procument/QuotationSummary";
import { useAppSelector } from "../../hooks/hooks";
import AdminPages from "../../layout/AdminPages";
import { ProcumentSideBar } from "../../constant/SideNavData";
import ProcumentQuotationSummary from "./procumentDashboard/ProcumentQuotationSummary";

export function PageRoutes() {
  return (
    <Routes>
      <Route path={RouteName.GatePass} element={<ProcumentGatePass />} />
      <Route path={RouteName.Srn} element={<ProcumentSRN />} />
      <Route
        path={RouteName.QuotationRequest}
        element={<ProcumentQuotationRequest />}
      />
      <Route
        path={RouteName.QuotationSummary}
        element={<ProcumentQuotationSummary />}
      />
    </Routes>
  );
}

const ProcumentDashboard = () => {
  const { auth } = useAppSelector((state) => state.persistedReducer);
  return (
    <>
      <AdminPages
        Sidebardata={ProcumentSideBar}
        Content={PageRoutes}
        Route={"procument"}
      />
    </>
  );
};

export default ProcumentDashboard;
