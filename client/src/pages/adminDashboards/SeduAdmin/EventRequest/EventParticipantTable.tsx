import { useEffect, useMemo, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import { EventRepresentative } from '../../../../constant/eventRepresentative';
import EventRequestService from '../../../../services/sedu/EventRequestService';
import IParticipantMaster from '../../../../types/sedu/IParticipantMaster';

function EventParticipantTable({ selectedData }: any) {
	const [eventData, setEventData] = useState({});
	const [eventRepresentativeData, setEventRepresentativeData] = useState<
		Array<any>
	>([]);
	const [rowId, setRowId] = useState(0);
	const [pageSize, setPageSize] = useState(10);
	const [loading, setLoading] = useState(false);

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
	const columns = useMemo(
		() => [
			{
				field: 'participantId',
				headerName: 'Participant Id',
				width: 150,
				editable: true,
			},
			{
				field: 'name',
				headerName: 'Name',
				width: 200,
				editable: true,
			},
			{
				field: 'nic',
				headerName: 'Nic',
				width: 200,
				editable: true,
			},
			{
				field: 'contactNo',
				headerName: 'Contact No',
				width: 200,
				editable: true,
			},
			{
				field: 'address',
				headerName: 'Address',
				width: 300,
				editable: true,
			},
			{
				field: 'email',
				headerName: 'Email',
				width: 300,
				editable: true,
			},
			{
				field: 'participantType',
				headerName: 'Participant Type',
				width: 200,
				editable: true,
			},
		],
		[rowId]
	);
	return (
		<div className='admin-table-section mt-10'>
			Event Details for Event Id - {selectedData}
			<div className='w-full h-[1000px]'>
				{!loading ? (
					<DataGrid
						components={{ Toolbar: GridToolbar }}
						rowHeight={60}
						columns={columns}
						rows={eventRepresentativeData && eventRepresentativeData}
						getRowId={(row) => row.participantId}
						rowsPerPageOptions={[10, 20, 30]}
						pageSize={pageSize}
						onPageSizeChange={(newPagesize) => setPageSize(newPagesize)}
						onCellEditCommit={(params: any) => setRowId(params.id)}
					/>
				) : (
					<></>
				)}
			</div>
		</div>
	);
}

export default EventParticipantTable;
