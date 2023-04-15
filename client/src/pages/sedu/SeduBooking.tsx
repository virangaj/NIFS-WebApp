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
					res.data?.map((d: any) => {
						let singleEvent = {
							title: d.title,
							date: dateConveter(d.startDate),
						};
						console.log(singleEvent);
						requests.push(singleEvent);
					});
				})
				.then((e) => {
					console.log(e);
				});
			setLoading(false);
		}, 500);
	};

	const handleDateClick = () => {};
	console.log(requests);
	const events = [
		{ title: 'Event 1', date: '2023-04-01' },
		{ title: 'Event 2', date: '2023-04-01' },
		{ title: 'Event 2', date: '2023-04-05' },
		{ title: 'Event 3', date: '2023-04-15' },
	];
	return (
		<div className='h-auto sub-body-content'>
			<h1 className='page-title'>Booking</h1>
			<hr className='horizontal-line' />
			<div className='w-[60%]'></div>
		</div>
	);
}

export default SeduBooking;
