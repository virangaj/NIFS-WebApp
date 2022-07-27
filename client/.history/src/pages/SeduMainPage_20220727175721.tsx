import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AttendanceFeedback from '../components/sedu/AttendanceFeedback';
import EventRequest from '../components/sedu/EventRequest';
import MaterialSearch from '../components/sedu/MaterialSearch';
import ParticipantMaster from '../components/sedu/ParticipantMaster';
import ProjectProposal from '../components/sedu/ProjectProposal';
import QuickResponseCode from '../components/sedu/QuickResponseCode';
import SeduBooking from '../components/sedu/SeduBooking';
import SeduReportGenerator from '../components/sedu/SeduReportGenerator';
import SeduSecondaryNavbar from '../components/sedu/shared/SeduSecondaryNavbar';
import UpdateEventMaterial from '../components/sedu/UpdateEventMaterial';
import VenueMaster from '../components/sedu/VenueMaster';
import SecondaryNavbar from '../components/shared/SecondaryNavbar';


// sedu main page where all other section of sedu department can be access from here
function SeduMainPage() {
	const pages: any = [
		{
			section: 'Master',
			only_admin: true,
			routes: [
				{
					title: 'Venue Master',
					link: '/sedu/venue-master',
					img: 'https://img.icons8.com/color/50/000000/home--v1.png',
					only_admin: true,
				},
				{
					title: 'Participant Master',
					link: '/sedu/participant-master',
					img: 'https://img.icons8.com/ultraviolet/50/000000/handshake.png',
					only_admin: true
				}
			]
		},
		{
			section: 'Transaction',
			only_admin: false,
			routes: [
				{
					title: 'Booking',
					link: '/sedu/booking',
					img: 'https://img.icons8.com/external-flaticons-flat-flat-icons/50/000000/external-booking-vacation-planning-trip-abroad-flaticons-flat-flat-icons.png',
					only_admin: false
				},
				{
					title: 'Event Request',
					link: '/sedu/event-request',
					img: 'https://img.icons8.com/dusk/50/000000/invite.png',
					only_admin: false
				},
				{
					title: 'Attendance Feedback',
					link: '/sedu/attendance-feedback',
					img: 'https://img.icons8.com/external-fauzidea-flat-fauzidea/50/000000/external-feedback-online-learning-fauzidea-flat-fauzidea.png',
					only_admin: false
				},
				{
					title: 'Update Event Material',
					link: '/sedu/update-material',
					img: 'https://img.icons8.com/fluency/50/000000/available-updates.png',
					only_admin: true
				},
				{
					title: 'Quick Response Code',
					link: '/sedu/quick-response',
					img: 'https://img.icons8.com/color/50/000000/qr-code--v1.png',
					only_admin: false
				},
				{
					title: 'Project Proposal',
					link: '/sedu/project-proposal',
					img: 'https://img.icons8.com/fluency/50/000000/documents.png',
					only_admin: false
				},
				{
					title: 'Material Search',
					link: '/sedu/material-search',
					img: 'https://img.icons8.com/fluency/50/000000/search.png',
					only_admin: false
				},
			]
		},
		{
			section: 'Reports',
			only_admin: true,
			routes: [
				{
					title: 'SEDU Report Generator ',
					link: '/sedu/report-generator',
					img: 'https://img.icons8.com/cute-clipart/50/000000/load-from-file.png',
					only_admin: true,
				},
			]
		},
	]

	return <div>
		{/* <SeduSecondaryNavbar /> */}
		<SecondaryNavbar pages={pages} />
		<div className="sub-body-content">
			<Routes>
				<Route path="/venue-master" element={<VenueMaster />} />
				<Route path="/participant-master" element={<ParticipantMaster />} />
				<Route path="/booking" element={<SeduBooking />} />
				<Route path="/event-request" element={<EventRequest />} />

				<Route path="/attendance-feedback" element={<AttendanceFeedback />} />
				<Route path="/update-material" element={<UpdateEventMaterial />} />
				<Route path="/quick-response" element={<QuickResponseCode />} />
				<Route path="/project-proposal" element={<ProjectProposal />} />
				<Route path="/material-search" element={<MaterialSearch />} />
				<Route path="/report-generator" element={<SeduReportGenerator />} />

			</Routes>
		</div>
	</div>;
}

export default SeduMainPage;
