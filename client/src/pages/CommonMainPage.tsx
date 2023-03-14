import SecondaryNavbar from "../components/shared/SecondaryNavbar";
import Pages from "../components/data/CommonNavData.json";

import Dots from "../images/dots_circle_b.png";
import { Route, Routes } from "react-router-dom";
import { RouteName } from "../constant/routeNames";
import GatePass from "./common/GatePass";
import Overtime from "./common/Overtime";
import Srn from "./common/Srn";
import QuotationSummary from "./common/QuotationSummary";
import WorkRequest from "./common/WorkRequest";
import LeaveRequest from "./common/LeaveRequest";
import QuotationRequest from "./common/QuotationRequest";

function CommonMainPage() {
  return (
    <div className="body-content">
      {/* <SeduSecondaryNavbar /> */}
      <SecondaryNavbar pages={Pages} />
      <div className="fixed w-[400px] top-[-100px] right-[-100px] -z-10">
        <img src={Dots} alt="Dots" />
      </div>

      <Routes>
        <Route path={RouteName.GatePass} element={<GatePass />}></Route>
        <Route path={RouteName.OverTime} element={<Overtime />}></Route>
        <Route path={RouteName.Srn} element={<Srn />}></Route>
        <Route
          path={RouteName.QuotationSummary}
          element={<QuotationSummary />}
        ></Route>
        <Route path={RouteName.WorkRequest} element={<WorkRequest />}></Route>
        <Route path={RouteName.LeaveRequest} element={<LeaveRequest />}></Route>
        <Route
          path={RouteName.QuotationRequest}
          element={<QuotationRequest />}
        ></Route>
      </Routes>
    </div>
  );
}

export default CommonMainPage;
