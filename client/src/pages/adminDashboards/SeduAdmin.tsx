import React from "react";
import { Route, Routes } from "react-router-dom";
import { RouteName } from "../../constant/routeNames";
import AdminPages from "../../layout/AdminPages";
import { SeduAdminSideNavbar } from "../../constant/SideNavData";
import Chargers from "./SeduAdmin/charges/Chargers";
import Facilities from "./SeduAdmin/facilities/Facilities";

export function PageRoutes() {
  return (
    <Routes>
      <Route path={RouteName.Facilities} element={<Facilities />} />
      <Route path={RouteName.Charges} element={<Chargers />} />
    </Routes>
  );
}

function SeduAdmin() {
  return (
    <div>
      <AdminPages
        Sidebardata={SeduAdminSideNavbar}
        Content={PageRoutes}
        Route="sedu"
      />
    </div>
  );
}

export default SeduAdmin;
