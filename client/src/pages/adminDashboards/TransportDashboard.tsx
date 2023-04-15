import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { RouteName } from '../../constant/routeNames';
import HODTravelRequestReq from './TransportDashboard/HODTravelRequestReq';
import HODTransportCostReq from './TransportDashboard/HODTransportCostReq';
import { useAppSelector } from '../../hooks/hooks';
import AdminPages from '../../layout/AdminPages';
import { TransportSideNavbar } from '../../constant/SideNavData';
import AdminRoutePage from './shared/AdminRoutePage';

export function PageRoutes() {
	return (
		<Routes>
			<Route
				path='/*'
				element={
					<AdminRoutePage
						Sidebardata={TransportSideNavbar}
						Route={'transport'}
					/>
				}
			/>
			<Route
				path={RouteName.TransportTravelRequest}
				element={<HODTravelRequestReq />}
			/>
			<Route path={RouteName.TransportCost} element={<HODTransportCostReq />} />
		</Routes>
	);
}

const TransportDashboard = () => {
	const { auth } = useAppSelector((state) => state.persistedReducer);
	return (
		<>
			<AdminPages
				Sidebardata={TransportSideNavbar}
				Content={PageRoutes}
				Route={'transport'}
			/>
		</>
	);
};

export default TransportDashboard;
