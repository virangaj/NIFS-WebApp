import { Route, Routes } from "react-router-dom";

import VehicleMaster from "./transport/VehicleMaster";
import VehicleReplacement from "./transport/VehicleReplacement";
import VehicleRepair from "./transport/VehicleRepair";
import VehicleReplacmentRequest from "./transport/VehicleReplacmentRequest";
import RepairRequest from "./transport/RepairRequest";
import VehicleMaintainanceService from "./transport/VehicleMaintainanceService";
import TransportReportGenerator from "./transport/TransportReportGenerator";
import MaintainanceRequest from "./transport/MaintainanceRequest";

// transport main page where all other section of transport department can be access from here
function TransportMainPage() {
  return (
    <div className="body-content">
      <VehicleMaster />
      <VehicleReplacement />
      <VehicleRepair />
      <VehicleReplacmentRequest />
      <RepairRequest />
      <VehicleMaintainanceService />
      <TransportReportGenerator />
      <MaintainanceRequest />

      <div className="sub-body-content">
        <Routes></Routes>
      </div>
    </div>
  );
}

export default TransportMainPage;
