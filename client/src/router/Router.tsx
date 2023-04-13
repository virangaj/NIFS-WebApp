import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RouteName } from '../constant/routeNames';

//pages
import Home from '.././pages/Home';
import TransportMainPage from '.././pages/TransportMainPage';
import CommonMainPage from '.././pages/CommonMainPage';
import AccountMainPage from '.././pages/AccountMainPage';
import AdminMainPage from '.././pages/AdminMainPage';
import LibraryMainPage from '.././pages/LibraryMainPage';
import ProcumentMainPage from '.././pages/ProcumentMainPage';
import SeduMainPage from '.././pages/SeduMainPage';
import UserPermissionMainPage from '.././pages/UserPermissionMainPage';
import NotificationMainPage from '.././pages/NotificationMainPage';
import HelpMainPage from '.././pages/HelpMainPage';
import ErrorPage from '.././pages/ErrorPage';
// import Navbar from '.././components/shared/Navbar';
import Footer from '.././components/shared/Footer';
import BackToTop from '.././components/shared/BackToTop';
import AdminAdmin from '.././pages/adminDashboards/AdminAdmin';
import ChangePassword from '.././pages/login/ChangePassword';
import Login from '../pages/Login';
import TailwindNavbar from '../components/shared/TailwindNavbar';
import MainPages from '../layout/MainPages';
import DirectorAdmin from '../pages/adminDashboards/DirectorAdmin';
import SeduAdmin from '../pages/adminDashboards/SeduAdmin';
import { useAppSelector } from '../hooks/hooks';
import { useEffect, useState } from 'react';
import HodDashbaord from '../pages/adminDashboards/HodDashbaord';

const AppRouter = () => {
	const { auth } = useAppSelector((state) => state.persistedReducer);
	const [division, setDivision] = useState();
	useEffect(() => {
		if (auth !== null) {
			setDivision(auth?.user?.user.division);
		}
	}, [auth]);
	return (
		<BrowserRouter>
			<Routes>
				{/* login page */}
				<Route path={RouteName.Login} element={<Login />} />

				{/* change password */}

				<Route path={RouteName.ChangePassword} element={<ChangePassword />} />

				{/* Home page */}

				<Route
					path={RouteName.Home}
					element={
						<>
							<MainPages Content={Home} />
						</>
					}
				/>
				{/* Common page */}

				<Route
					path={RouteName.Common}
					element={
						<>
							<MainPages Content={CommonMainPage} />
						</>
					}
				/>
				{/* admin page */}

				<Route
					path={RouteName.Admin}
					element={
						<>
							<MainPages Content={AdminMainPage} />
						</>
					}
				/>
				{/* Library page */}

				<Route
					path={RouteName.Library}
					element={
						<>
							<MainPages Content={LibraryMainPage} />
						</>
					}
				/>
				{/* Procument page */}

				<Route
					path={RouteName.Procument}
					element={
						<>
							<MainPages Content={ProcumentMainPage} />
						</>
					}
				/>
				{/* Sedu  page */}

				<Route
					path={RouteName.Sedu}
					element={
						<>
							<MainPages Content={SeduMainPage} />
						</>
					}
				/>

				{/* Tranapost page */}

				<Route
					path={RouteName.Transport}
					element={
						<>
							<MainPages Content={TransportMainPage} />
						</>
					}
				/>
				{/* Error page */}

				<Route
					path={RouteName.ErrorPage}
					element={
						<>
							<MainPages Content={ErrorPage} />
						</>
					}
				/>

				{/* Admin page of admin division*/}

				<Route
					path={RouteName.AdminAdmin}
					element={
						<>
							<MainPages Content={AdminAdmin} />
						</>
					}
				/>

				{/* Admin page of director*/}

				<Route
					path={RouteName.Director}
					element={
						<>
							<MainPages Content={DirectorAdmin} />
						</>
					}
				/>

				{/* Admin page of sedu division*/}

				<Route
					path={RouteName.SeduAdmin}
					element={
						<>
							<MainPages Content={SeduAdmin} />
						</>
					}
				/>

				{/* Admin page of HOD*/}
				<Route
					path={RouteName.HODAdmin}
					element={
						<>
							<MainPages Content={HodDashbaord} />
						</>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
};

export default AppRouter;
