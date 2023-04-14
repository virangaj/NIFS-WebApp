import { useEffect, useState } from 'react';
import { EventRepresentative } from '../../../../constant/eventRepresentative';
import EventRequestService from '../../../../services/sedu/EventRequestService';

function EventParticipantTable({ selectedData }: any) {
	const [eventData, setEventData] = useState({});
	const [eventRepresentativeData, setEventRepresentativeData] = useState([]);

	useEffect(() => {
		if (selectedData != null) {
			retrievEventData();
		}
	}, [selectedData]);

	const retrievEventData = () => {
		EventRequestService.getEventById(selectedData)
			.then((res) => {
				console.log(res);
				setEventData(res.data.eventData);
				setEventRepresentativeData(res.data.representativeList);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	return (
		<div className='admin-table-section mt-10'>
			Event Details for Event Id - {selectedData}
			<table>
				<tr>
					<th>ID</th>
					<th>Name</th>
					<th>NIC No</th>
					<th>Contact No</th>
					<th>Address</th>
					<th>Email</th>
				</tr>
				<tbody>
					{eventRepresentativeData &&
						eventRepresentativeData.map((t: any, index: number) => (
							<tr key={index}>
								<td>{t.participantId}</td>
								<td>{t.name}</td>
								<td>{t.nic}</td>
								<td>{t.contactNo}</td>
								<td>{t.address}</td>
								<td>{t.email}</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
}

export default EventParticipantTable;
