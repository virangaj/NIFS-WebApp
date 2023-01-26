import React, { useEffect } from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import TransportMainPage from './pages/TransportMainPage';
import CommonMainPage from './pages/CommonMainPage';
import AccountMainPage from './pages/AccountMainPage';
import AdminMainPage from './pages/AdminMainPage';
import LibraryMainPage from './pages/LibraryMainPage';
import ProcumentMainPage from './pages/ProcumentMainPage';
import SeduMainPage from './pages/SeduMainPage';
import UserPermissionMainPage from './pages/UserPermissionMainPage';
import NotificationMainPage from './pages/NotificationMainPage';
import HelpMainPage from './pages/HelpMainPage';
import ErrorPage from './pages/ErrorPage';
import VerticalMainNavbar from './components/shared/VerticalMainNavbar';

import Navbar from './components/shared/Navbar';
import Login from './pages/Login';

import { RouteName } from './constant/routeNames';
import Footer from './components/shared/Footer';
import BackToTop from './components/shared/BackToTop';
import AdminAdmin from './pages/adminDashboards/AdminAdmin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChangePassword from './pages/login/ChangePassword';
import AppRouter from './router/Router';
function App() {
	return (
		<div className='flex flex-col mx-auto'>
			<ToastContainer
				position='top-right'
				autoClose={5000}
				limit={1}
				hideProgressBar={false}
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='dark'
			/>

			<AppRouter />
		</div>
	);
}

export default App;
