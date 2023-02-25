
import React from "react";
import { Route, Routes } from "react-router-dom";
import SecondaryNavbar from "../components/shared/SecondaryNavbar";
import ArticleRequest from "./libraryDep/ArticleRequest";
import CatalogSearch from "./libraryDep/CatalogSearch";
import ItemsBurrowReturn from "./libraryDep/ItemsBurrowReturn";
import JournalRequest from "./libraryDep/JournalRequest";

import Pages from "../components/data/LibraryNavData.json";
import Dots from "../images/dots_circle_b.png";
import { RouteName } from "../constant/routeNames";

function LibraryMainPage() {
  return (
    <div className="body-content min-h-[80vh]">
      <SecondaryNavbar pages={Pages} />

      <div className="fixed w-[400px] top-[-100px] right-[-100px] -z-10">
        <img src={Dots} alt="Dots" />
      </div>

      <Routes>
        <Route
          path={RouteName.LibraryArticleRequest}
          element={<ArticleRequest />}
        />
        <Route
          path={RouteName.LibraryJournalRequest}
          element={<JournalRequest />}
        />
        <Route
          path={RouteName.LibraryItemsBurrowAndReturn}
          element={<ItemsBurrowReturn />}
        />
        <Route
          path={RouteName.LibraryCatalogSearch}
          element={<CatalogSearch />}
        />
      </Routes>
    </div>
  );

}

export default LibraryMainPage;
