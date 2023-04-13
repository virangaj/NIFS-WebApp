import React from "react";
import { Route, Routes } from "react-router-dom";
import { RouteName } from "../../constant/routeNames";
import LibraryArticleRequest from "./libraryDashboard/LibraryArticleRequest";
import LibraryJournalRequest from "./libraryDashboard/LibraryJournalRequest";
import { LibraryCatalogSearch } from "./libraryDashboard/LibraryCatalogSearch";
import AdminPages from "../../layout/AdminPages";
import {
  LibrarySideBar,
  TransportSideNavbar,
} from "../../constant/SideNavData";

export function PageRoutes() {
  return (
    <Routes>
      <Route
        path={RouteName.LibraryArticleRequest}
        element={<LibraryArticleRequest />}
      />
      <Route
        path={RouteName.LibraryJournalRequest}
        element={<LibraryJournalRequest />}
      />
      <Route
        path={RouteName.LibraryCatalogSearch}
        element={<LibraryCatalogSearch />}
      />
    </Routes>
  );
}

export const LibraryDashboard = () => {
  return (
    <>
      <AdminPages
        Sidebardata={LibrarySideBar}
        Content={PageRoutes}
        Route={"library"}
      />
    </>
  );
};
