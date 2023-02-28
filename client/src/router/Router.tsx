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
import Navbar from '.././components/shared/Navbar';
import Footer from '.././components/shared/Footer';
import BackToTop from '.././components/shared/BackToTop';
import AdminAdmin from '.././pages/adminDashboards/AdminAdmin';
import ChangePassword from '.././pages/login/ChangePassword';
import Login from '../pages/Login';
import { Counter } from '../redux/Counter';

const AppRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={RouteName.Login} element={<Login />} />
				<Route path={RouteName.ChangePassword} element={<ChangePassword />} />

				<Route
					path={RouteName.Home}
					element={
						<>
							<Navbar />
							<BackToTop />
							<Home />
							{/* <Counter /> */}
							<Footer />
						</>
					}
				/>
				<Route
					path={RouteName.Common}
					element={
						<>
							<Navbar />
							<BackToTop />
							<CommonMainPage />
							<Footer />
						</>
					}
				/>
				<Route
					path={RouteName.Account}
					element={
						<>
							<Navbar />
							<BackToTop />
							<AccountMainPage />
							<Footer />
						</>
					}
				/>
				<Route
					path={RouteName.Admin}
					element={
						<>
							<Navbar />
							<BackToTop />
							<AdminMainPage />
							<Footer />
						</>
					}
				/>
				<Route
					path={RouteName.Library}
					element={
						<>
							<Navbar />
							<BackToTop />
							<LibraryMainPage />
							<Footer />
						</>
					}
				/>
				<Route
					path={RouteName.Procument}
					element={
						<>
							<Navbar />
							<BackToTop />
							<ProcumentMainPage />
							<Footer />
						</>
					}
				/>
				<Route
					path={RouteName.Sedu}
					element={
						<>
							<Navbar />
							<BackToTop />
							<SeduMainPage />
							<Footer />
						</>
					}
				/>
				<Route
					path={RouteName.Transport}
					element={
						<>
							<Navbar />
							<BackToTop />
							<TransportMainPage />
							<Footer />
						</>
					}
				/>
				<Route
					path={RouteName.UserPermission}
					element={
						<>
							<Navbar />
							<BackToTop />
							<UserPermissionMainPage />
							<Footer />
						</>
					}
				/>
				<Route
					path={RouteName.Notification}
					element={
						<>
							<Navbar />
							<BackToTop />
							<NotificationMainPage />
							<Footer />
						</>
					}
				/>
				<Route
					path={RouteName.Help}
					element={
						<>
							<Navbar />
							<BackToTop />
							<HelpMainPage />
							<Footer />
						</>
					}
				/>
				<Route
					path={RouteName.ErrorPage}
					element={
						<>
							<Navbar />
							<BackToTop />
							<ErrorPage />
							<Footer />
						</>
					}
				/>
				<Route
					path={RouteName.AdminAdmin}
					element={
						<>
							<Navbar />
							<BackToTop />
							<AdminAdmin />
							<Footer />
						</>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
};

export default AppRouter;
