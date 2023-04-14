import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
function SeduBooking() {
	const events = [
		{ title: 'Event 1', date: '2023-04-01' },
		{ title: 'Event 2', date: '2023-04-01' },
		{ title: 'Event 2', date: '2023-04-05' },
		{ title: 'Event 3', date: '2023-04-15' },
	];
	return (
		<div className='sub-body-content'>
			<h1 className='page-title'>Booking</h1>
			<hr className='horizontal-line' />
			<FullCalendar plugins={[dayGridPlugin]} events={events} />
		</div>
	);
}

export default SeduBooking;
