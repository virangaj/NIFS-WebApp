import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { RouteName } from "../../constant/routeNames";
import Employees from "./AdminAdmin/Employees";
import EmployeeType from "./AdminAdmin/EmployeeType";

import SideNavbar from "./AdminAdmin/SideNavbar";
import Dots from "../../images/dots_circle_b.png";
import EmpCategory from "./AdminAdmin/EmpCategory";

function AdminAdmin() {
	return (
		<div className="body-content">
			<div className="fixed w-[400px] top-[-100px] right-[-100px] -z-10">
				<img src={Dots} alt="Dots" />
			</div>
			<div className="flex items-start mb-20">
				<SideNavbar />
				<div className="admin-sub-panel-body">
					{/* employee type*/}
					<Routes>
						<Route path={RouteName.EmployeeType} element={<EmployeeType />} />
            <Route path={RouteName.EmployeeCategory} element={<EmpCategory />} />
					</Routes>

					{/* employee */}
					{/* employee category */}
					{/* designation */}
					{/* division */}
					{/* location */}
				</div>
			</div>
		</div>
	);
}

export default AdminAdmin;
