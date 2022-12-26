import React from 'react';
import { BiUserPin } from 'react-icons/bi';
import { GrUserSettings, GrUserManager, GrUserWorker } from 'react-icons/gr';
import { Link, useLocation } from 'react-router-dom';
import { RouteName } from '../../../constant/routeNames';
function SideNavbar() {
	const location: any = useLocation();
	console.log(location.pathname);

	return (
		<aside className="admin-side-nav">
			<div className="py-2 text-gray-500">
				<ul className="mt-3">
					<li className="relative px-6 py-3">
						<span
							className={
								location.pathname ===
								`/dashboard/admin/admin${RouteName.EmployeeType}`
									? 'active-admin-panel-marker'
									: 'admin-panel-marke'
							}
							aria-hidden="true"
						></span>
						<Link to={`/dashboard/admin/admin${RouteName.EmployeeType}`}>
							<p className="admin-sidebar-text">
								<BiUserPin className="w-5 h-5" />
								<span className="ml-4">Employee Types</span>
							</p>
						</Link>
					</li>
					<li className="relative px-6 py-3">
						<span
							className={
								location.pathname ===
								`/dashboard/admin/admin${RouteName.EmployeeCategory}`
									? 'active-admin-panel-marker'
									: 'admin-panel-marke'
							}
							aria-hidden="true"
						></span>
						<Link to={`/dashboard/admin/admin${RouteName.EmployeeCategory}`}>
							<p className="admin-sidebar-text">
								<GrUserSettings className="w-5 h-5" />
								<span className="ml-4">Employee Category</span>
							</p>
						</Link>
					</li>

					<li className="relative px-6 py-3">
						<span
							className={
								location.pathname ===
								`/dashboard/admin/admin${RouteName.Designation}`
									? 'active-admin-panel-marker'
									: 'admin-panel-marke'
							}
							aria-hidden="true"
						></span>
						<Link to={`/dashboard/admin/admin${RouteName.Designation}`}>
							<p className="admin-sidebar-text">
								<GrUserManager className="w-5 h-5" />
								<span className="ml-4">Designations</span>
							</p>
						</Link>
					</li>

					<li className="relative px-6 py-3">
						<span
							className={
								location.pathname ===
								`/dashboard/admin/admin${RouteName.Divisions}`
									? 'active-admin-panel-marker'
									: 'admin-panel-marke'
							}
							aria-hidden="true"
						></span>
						<Link to={`/dashboard/admin/admin${RouteName.Divisions}`}>
							<p className="admin-sidebar-text">
								<GrUserWorker className="w-5 h-5" />
								<span className="ml-4">Divisions</span>
							</p>
						</Link>
					</li>
				</ul>
			</div>
		</aside>
	);
}

export default SideNavbar;
