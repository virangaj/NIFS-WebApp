import { Route, Routes } from "react-router-dom";

import VehicleMaster from "./transport/VehicleMaster";
import VehicleReplacement from "./transport/VehicleReplacement";
import VehicleRepair from "./transport/VehicleRepair";
import VehicleReplacmentRequest from "./transport/VehicleReplacmentRequest";
import RepairRequest from "./transport/RepairRequest";
import VehicleMaintainanceService from "./transport/VehicleMaintainance";
import TransportReportGenerator from "./transport/TransportReportGenerator";
import MaintainanceRequest from "./transport/MaintainanceRequest";
import SecondaryNavbar from "../components/shared/SecondaryNavbar";

import Pages from "../components/data/TransportNavData.json";
import Dots from "../images/dots_circle_b.png";
import { RouteName } from "../constant/routeNames";

// transport main page where all other section of transport department can be access from here
function TransportMainPage() {
  return (
    <div className="body-content min-h-[80vh]">
      <SecondaryNavbar pages={Pages} />

      <div className="fixed w-[400px] top-[-100px] right-[-100px] -z-10">
        <img src={Dots} alt="Dots" />
      </div>

      <Routes>
        <Route
          path={RouteName.TransportVehicleMaster}
          element={<VehicleMaster />}
        />
        <Route
          path={RouteName.TransportVehicleReplacement}
          element={<VehicleReplacement />}
        />
        <Route
          path={RouteName.TransportVehicleMaintenance}
          element={<VehicleMaintainanceService />}
        />
        <Route
          path={RouteName.TransportVehicleRepair}
          element={<VehicleRepair />}
        />
        <Route
          path={RouteName.TransportVehicleReplacementRequest}
          element={<VehicleReplacmentRequest />}
        />
        <Route
          path={RouteName.TransportVehicleMaintenanceRequest}
          element={<MaintainanceRequest />}
        />
        <Route
          path={RouteName.TransportVehicleRepairRequest}
          element={<RepairRequest />}
        />
        <Route
          path={RouteName.TranportReports}
          element={<TransportReportGenerator />}
        />
      </Routes>
    </div>
  );
}

export default TransportMainPage;
