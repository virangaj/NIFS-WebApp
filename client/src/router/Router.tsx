import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RouteName } from "../constant/routeNames";

//pages
import Home from ".././pages/Home";
import TransportMainPage from ".././pages/TransportMainPage";
import CommonMainPage from ".././pages/CommonMainPage";
import AccountMainPage from ".././pages/AccountMainPage";
import AdminMainPage from ".././pages/AdminMainPage";
import LibraryMainPage from ".././pages/LibraryMainPage";
import ProcumentMainPage from ".././pages/ProcumentMainPage";
import SeduMainPage from ".././pages/SeduMainPage";
import UserPermissionMainPage from ".././pages/UserPermissionMainPage";
import NotificationMainPage from ".././pages/NotificationMainPage";
import HelpMainPage from ".././pages/HelpMainPage";
import ErrorPage from ".././pages/ErrorPage";
// import Navbar from '.././components/shared/Navbar';
import Footer from ".././components/shared/Footer";
import BackToTop from ".././components/shared/BackToTop";
import AdminAdmin from ".././pages/adminDashboards/AdminAdmin";
import ChangePassword from ".././pages/login/ChangePassword";
import Login from "../pages/Login";
import TailwindNavbar from "../components/shared/TailwindNavbar";
import MainPages from "../layout/MainPages";
import DirectorAdmin from "../pages/adminDashboards/DirectorAdmin";
import SeduAdmin from "../pages/adminDashboards/SeduAdmin";

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
              <MainPages Content={Home} />
            </>
          }
        />
        <Route
          path={RouteName.Common}
          element={
            <>
              <MainPages Content={CommonMainPage} />
            </>
          }
        />
        <Route
          path={RouteName.Account}
          element={
            <>
              <MainPages Content={AccountMainPage} />
            </>
          }
        />
        <Route
          path={RouteName.Admin}
          element={
            <>
              <MainPages Content={AdminMainPage} />
            </>
          }
        />
        <Route
          path={RouteName.Library}
          element={
            <>
              <MainPages Content={LibraryMainPage} />
            </>
          }
        />
        <Route
          path={RouteName.Procument}
          element={
            <>
              <MainPages Content={ProcumentMainPage} />
            </>
          }
        />
        <Route
          path={RouteName.Sedu}
          element={
            <>
              <MainPages Content={SeduMainPage} />
            </>
          }
        />
        <Route
          path={RouteName.Transport}
          element={
            <>
              <MainPages Content={TransportMainPage} />
            </>
          }
        />

        <Route
          path={RouteName.ErrorPage}
          element={
            <>
              <MainPages Content={ErrorPage} />
            </>
          }
        />
        <Route
          path={RouteName.AdminAdmin}
          element={
            <>
              <MainPages Content={AdminAdmin} />
            </>
          }
        />

        <Route
          path={RouteName.Director}
          element={
            <>
              <MainPages Content={DirectorAdmin} />
            </>
          }
        />
        <Route
          path={RouteName.SeduAdmin}
          element={
            <>
              <MainPages Content={SeduAdmin} />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
