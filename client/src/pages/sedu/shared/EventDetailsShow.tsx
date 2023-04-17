import { useEffect, useState } from 'react';
import EventRequestService from '../../../services/sedu/EventRequestService';
import EventDetailText from './EventDetailText';
import Ripple from '../../../components/Ripple';

function EventDetailsShow({ selected }: any) {
	const [event, setEvent] = useState<any>({});

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		setTimeout(() => {
			EventRequestService.getEventById(selected).then((res: any) => {
				console.log(res);
				setEvent(res.data.eventData);
				setLoading(false);
			});
		}, 1000);
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
			<EventDetailText
				title={'Created On'}
				value={event?.createdOn?.split('T')[0]}
			/>
			<EventDetailText title={'Venue'} value={event?.venueId} />
		</div>
	);
}

export default EventDetailsShow;
