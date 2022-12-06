import React, { useEffect } from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

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
import Login from './pages/Login'


import { RouteName } from "./constant/routeNames";
import Footer from './components/shared/Footer';
import BackToTop from './components/shared/BackToTop';



function App() {


  return (
    <div className='flex mx-auto flex-col'>
      <Router>
        <Navbar />
        <BackToTop />

        <Routes>
          <Route path={RouteName.Login} element={<Login />} />
          <Route path={RouteName.Home} element={<Home />} />
          <Route path={RouteName.Common} element={<CommonMainPage />} />
          <Route path={RouteName.Account} element={<AccountMainPage />} />
          <Route path={RouteName.Admin} element={<AdminMainPage />} />
          <Route path={RouteName.Library} element={<LibraryMainPage />} />
          <Route path={RouteName.Procument} element={<ProcumentMainPage />} />
          <Route path={RouteName.Sedu} element={<SeduMainPage />} />
          <Route path={RouteName.Transport} element={<TransportMainPage />} />
          <Route
            path={RouteName.UserPermission}
            element={<UserPermissionMainPage />}
          />
          <Route
            path={RouteName.Notification}
            element={<NotificationMainPage />}
          />
          <Route path={RouteName.Help} element={<HelpMainPage />} />
          <Route path={RouteName.ErrorPage} element={<ErrorPage />} />
        </Routes>


      </Router>

      <Footer />
    </div>
  );
}

export default App;
