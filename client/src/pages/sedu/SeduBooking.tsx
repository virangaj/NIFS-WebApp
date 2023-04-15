import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useEffect, useState } from 'react';
import EventRequestService from '../../services/sedu/EventRequestService';
import { dateConveter } from '../../utils/generateId';
import EventDetailsShow from './shared/EventDetailsShow';
function SeduBooking() {
	const [requests, setRequests] = useState<Array<any>>([]);
	const [selected, setSelected] = useState();
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
		setSelected(info.event.id);
	};

	console.log(requests);

	return (
		<div className='!h-screen sub-body-content'>
			<h1 className='page-title'>Booking</h1>
			<hr className='horizontal-line' />
			<div className='flex w-full'>
				<div className='w-[50%]'>
					<FullCalendar
						plugins={[dayGridPlugin, timeGridPlugin]}
						initialView='dayGridMonth'
						events={requests}
						aspectRatio={1}
						height={700}
						eventClick={eventClicked}
						selectable={true}
						navLinks={true}
						weekNumbers={true}
					/>
				</div>
				<div className='mt-20'>
					{selected ? <EventDetailsShow selected={selected} /> : <></>}
				</div>
			</div>
		</div>
	);
}

export default SeduBooking;
