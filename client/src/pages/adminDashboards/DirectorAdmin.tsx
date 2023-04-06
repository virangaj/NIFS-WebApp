import { Route, Routes } from 'react-router-dom';
import { RouteName } from '../../constant/routeNames';
import AdminResignationReq from './AdminAdmin/AdminResignationReq';

export function PageRoutes() {
	return (
		<Routes>
			<Route
				path={RouteName.ResignationRequest}
				element={<AdminResignationReq />}
			/>
		</Routes>
	);
}

function DirectorAdmin() {
	return <div>DirectorAdmin</div>;
}

export default DirectorAdmin;
