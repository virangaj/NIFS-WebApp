import SecondaryNavbar from '../components/shared/SecondaryNavbar';
import Pages from '../components/data/CommonNavData.json';

import Dots from '../images/dots_circle_b.png';
import { Route, Routes } from 'react-router-dom';
import { RouteName } from '../constant/routeNames';

import Overtime from './common/Overtime';
import WorkRequest from './common/WorkRequest';
import LeaveRequest from './common/LeaveRequest';

import ContentPage from '../layout/ContentPage';

export function PageRoutes() {
	return (
		<Routes>
			<Route path={RouteName.OverTime} element={<Overtime />}></Route>

			<Route path={RouteName.WorkRequest} element={<WorkRequest />}></Route>
			<Route path={RouteName.LeaveRequest} element={<LeaveRequest />}></Route>
		</Routes>
	);
}

function CommonMainPage() {
	return (
		<>
			<ContentPage Pages={Pages} Content={PageRoutes} />
		</>
	);
}

export default CommonMainPage;
