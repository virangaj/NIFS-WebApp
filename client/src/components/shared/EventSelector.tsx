import { useEffect, useState } from 'react';
import EventRequestService from '../../services/sedu/EventRequestService';
import TextBoxLabel from './TextBoxLabel';

function EventSelector({ onChange, value, name }: any) {
	const [loading, setLoading] = useState(false);
	const [eventData, setEventData] = useState<any>([]);
	useEffect(() => {
		retriveData();
	}, []);
	const retriveData = () => {
		setLoading(true);
		setTimeout(() => {
			setLoading(true);
			EventRequestService.getAllEvents()
				.then((res) => {
					setEventData(res.data);
					console.log(res);
				})
				.then((e) => {
					console.log(e);
				});
			setLoading(false);
		}, 500);
	};
	return (
		<div>
			<TextBoxLabel name='Select Event' />
			<select
				className='tailwind-text-box'
				onChange={onChange}
				value={value}
				name={name}
			>
				<option value='' disabled>
					Select Event
				</option>

				{eventData &&
					eventData.map((l: any, i: number) => (
						<option value={l.documentNo} key={i}>
							{l.documentNo} - {l.title}
						</option>
					))}
			</select>
		</div>
	);
}

export default EventSelector;
