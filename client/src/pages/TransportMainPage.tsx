import React from "react";

import TransportNavbar from "../components/Transport/shared/TransportNavbar";
import { Route, Routes } from "react-router-dom";
import NewRequest from "../components/Transport/NewRequest";
import RecommendedRequest from "../components/Transport/RecommendedRequest";
import ApproveRequest from "../components/Transport/ApproveRequest";
import VehicleMaster from "./transport/VehicleMaster";
import VehicleReplacement from "./transport/VehicleReplacement";
import VehicleRepair from "./transport/VehicleRepair";
import VehicleReplacmentRequest from "./transport/VehicleReplacmentRequest";
import RepairRequest from "./transport/RepairRequest";

// transport main page where all other section of transport department can be access from here
function TransportMainPage() {
  return (
    <div className="body-content">
      <TransportNavbar />
      {/* <VehicleMaster /> */}
      {/* <VehicleReplacement /> */}
      {/* <VehicleRepair /> */}
      {/* <VehicleReplacmentRequest /> */}
      <RepairRequest />

      <div className="sub-body-content">
        <Routes>
          {/* <Route path="/" element={<NewRequest />} />
					<Route path="/recommend" element={<RecommendedRequest />} />
					<Route path="/approve" element={<ApproveRequest />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default TransportMainPage;
