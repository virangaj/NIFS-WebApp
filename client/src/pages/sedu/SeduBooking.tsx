import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import { useEffect, useState } from 'react';
import EventRequestService from '../../services/sedu/EventRequestService';
import { dateConveter } from '../../utils/generateId';
function SeduBooking() {
	const [requests, setRequests] = useState<Array<any>>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		retriveData();
	}, []);

	const retriveData = () => {
		setLoading(true);
		setTimeout(() => {
			setLoading(true);
			EventRequestService.getAllEvents()
				.then((res) => {
					console.log(res);
					res.data?.map((d: any) => {
						let singleEvent = {
							id: d.documentNo,
							title: d.title,
							start: dateConveter(d.startDate),
							end: dateConveter(d.endDate),
						};
						console.log(singleEvent);
						setRequests((prevItems) => [...prevItems, singleEvent]);
					});
				})
				.then((e) => {
					console.log(e);
				});
			setLoading(false);
		}, 500);
	};

	const eventClicked = (info: any) => {
		// bind with an arrow function
		console.log(info.event.id);
	};

	console.log(requests);
	const events = [
		{ title: 'Event 1', date: '2023-04-01' },
		{ title: 'Event 2', date: '2023-04-01' },
		{ title: 'Event 2', date: '2023-04-05' },
		{ title: 'Event 3', date: '2023-04-15' },
	];
	return (
		<div className='!h-screen sub-body-content'>
			<h1 className='page-title'>Booking</h1>
			<hr className='horizontal-line' />
			<div className='w-[50%]'>
				<FullCalendar
					plugins={[dayGridPlugin]}
					initialView='dayGridMonth'
					events={requests}
					aspectRatio={1}
					height={700}
					eventClick={eventClicked}
					// dateClick={handleDateClick}
				/>
			</div>
		</div>
	);
}

export default SeduBooking;
