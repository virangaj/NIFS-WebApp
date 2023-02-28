import React from "react";
import SecondaryNavbar from "../components/shared/SecondaryNavbar";
import Pages from "../components/data/AdminNavData.json";

import Dots from "../images/dots_circle_b.png";
import { Route, Routes } from "react-router-dom";
import { RouteName } from "../constant/routeNames";
import ContractExtension from "./admin/ContractExtension";

function AdminMainPage() {
  return (
    <div className="body-content min-h-[80vh]">
      {/* <SeduSecondaryNavbar /> */}
      <SecondaryNavbar pages={Pages} />
      <div className="fixed w-[400px] top-[-100px] right-[-100px] -z-10">
        <img src={Dots} alt="Dots" />
      </div>

      {/* <AdministrativeReport /> */}
      {/* <Accomodation /> */}

      <Routes>
        <Route
          path={RouteName.ContractExtension}
          element={<ContractExtension />}
        />
      </Routes>
    </div>
  );
}

export default AdminMainPage;
