import { Route, Routes } from 'react-router-dom';
import { RouteName } from '../constant/routeNames';
import GatePass from './procument/GatePass';
import QuotationRequest from './procument/QuotationRequest';
import QuotationSummary from './procument/QuotationSummary';
import Srn from './procument/Srn';
import Pages from '../components/data/ProcumentNavData.json';
import ContentPage from '../layout/ContentPage';

export function PageRoutes() {
	return (
		<Routes>
			<Route path={RouteName.GatePass} element={<GatePass />}></Route>

			<Route
				path={RouteName.QuotationRequest}
				element={<QuotationRequest />}
			></Route>
			<Route
				path={RouteName.QuotationSummary}
				element={<QuotationSummary />}
			></Route>
			<Route path={RouteName.Srn} element={<Srn />}></Route>
		</Routes>
	);
}

function ProcumentMainPage() {
	return (
		<>
			<ContentPage Pages={Pages} Content={PageRoutes} />
		</>
	);
}

export default ProcumentMainPage;
