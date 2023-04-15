import { useEffect, useState } from 'react';
import EventRequestService from '../../../services/sedu/EventRequestService';
import EventDetailText from './EventDetailText';

function EventDetailsShow({ selected }: any) {
	const [event, setEvent] = useState<any>({});

	useEffect(() => {
		EventRequestService.getEventById(selected).then((res: any) => {
			console.log(res);
			setEvent(res.data.eventData);
		});
	}, [selected]);

	return (
		<div className='ml-20'>
			<h1 className='page-title'>Event Details - {selected}</h1>

			<EventDetailText title={'Document No'} value={event?.documentNo} />
			<EventDetailText title={'Start Date'} value={event?.startDate} />
			<EventDetailText title={'Start Time'} value={event?.startTime} />
			<EventDetailText title={'End Time'} value={event?.endTime} />
			<EventDetailText title={'End Date'} value={event?.endDate} />
			<EventDetailText title={'Event Type'} value={event?.eventType} />
			<EventDetailText title={'Funding Source'} value={event?.fundingId} />
			<EventDetailText
				title={'No Participants'}
				value={event?.noParticipants}
			/>
			<EventDetailText title={'Project'} value={event?.projectId} />
			<EventDetailText title={'Budget'} value={event?.budget} />
			<EventDetailText title={'Created By'} value={event?.createdBy} />
			<EventDetailText title={'Created On'} value={event?.createdOn} />
			<EventDetailText title={'Venue'} value={event?.venueId} />
		</div>
	);
}

export default EventDetailsShow;
