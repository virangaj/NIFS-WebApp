import { Route, Routes } from 'react-router-dom';
import { RouteName } from '../../constant/routeNames';
import Login from '../../pages/Login';

const AuthRouter = () => {
	return (
		<Routes>
			<Route path={RouteName.Login} element={<Login />} />
		</Routes>
	);
};

export default AuthRouter;
