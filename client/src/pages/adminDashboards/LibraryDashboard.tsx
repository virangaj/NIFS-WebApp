import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { RouteName } from '../../constant/routeNames';
import LibraryArticleRequest from './libraryDashboard/LibraryArticleRequest';
import LibraryJournalRequest from './libraryDashboard/LibraryJournalRequest';
import AdminPages from '../../layout/AdminPages';
import {
	LibrarySideBar,
	TransportSideNavbar,
} from '../../constant/SideNavData';
import AdminRoutePage from './shared/AdminRoutePage';

export function PageRoutes() {
	return (
		<Routes>
			<Route
				path='/*'
				element={
					<AdminRoutePage Sidebardata={LibrarySideBar} Route={'library'} />
				}
			/>
			<Route
				path={RouteName.LibraryArticleRequest}
				element={<LibraryArticleRequest />}
			/>
			<Route
				path={RouteName.LibraryJournalRequest}
				element={<LibraryJournalRequest />}
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
				Route={'library'}
			/>
		</>
	);
};
