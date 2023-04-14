import React, { useEffect, useMemo, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import EventTable from './EventRequest/EventTable';
import { useAppSelector } from '../../../hooks/hooks';
import EventRequestService from '../../../services/sedu/EventRequestService';
import { Box } from '@mui/material';

function EventRequestAdmin() {
	const { auth } = useAppSelector((state) => state.persistedReducer);
	const [requests, setRequests] = useState<any>([]);
	const [selectedData, setSelectedData] = useState<Array<string>>([]);
	const [loading, setLoading] = useState(false);
	const [rowId, setRowId] = useState(0);
	const [pageSize, setPageSize] = useState(10);

	useEffect(() => {
		retriveData();
	}, []);
	const retriveData = () => {
		setLoading(true);
		setTimeout(() => {
			setLoading(true);
			EventRequestService.getAllEvents()
				.then((res) => {
					setRequests(res.data);
					console.log(res);
				})
				.then((e) => {
					console.log(e);
				});
			setLoading(false);
		}, 500);
	};

	const columns = useMemo(
		() => [
			{ field: 'documentNo', headerName: 'Document No', width: 160 },
			{
				field: 'title',
				headerName: 'Title',
				width: 250,
				editable: true,
			},
			{
				field: 'eventType',
				headerName: 'Event Type',
				width: 200,
				editable: true,
			},
			{
				field: 'remark',
				headerName: 'Remark',
				width: 300,
				editable: true,
			},
			{
				field: 'startDate',
				headerName: 'Start Date',
				width: 100,
				editable: true,
			},
			{
				field: 'startTime',
				headerName: 'Start Time',
				width: 100,
				editable: true,
			},
			{
				field: 'endDate',
				headerName: 'End Date',
				width: 100,
				editable: true,
			},
			{
				field: 'endTime',
				headerName: 'End Time',
				width: 100,
				editable: true,
			},
			{
				field: 'budget',
				headerName: 'Budget',
				width: 100,
				editable: true,
			},
			{
				field: 'noParticipants',
				headerName: 'No Participants',
				width: 110,
				editable: true,
			},
			{
				field: 'fundingId',
				headerName: 'Funding Id',
				width: 110,
				editable: true,
			},
			{
				field: 'projectId',
				headerName: 'Project Id',
				width: 110,
				editable: true,
			},
			{
				field: 'locationId',
				headerName: 'Location Id',
				width: 110,
				editable: true,
			},
			{
				field: 'venueId',
				headerName: 'Venue Id',
				width: 110,
				editable: true,
			},
		],
		[rowId]
	);

	return (
		<>
			<div className='admin-page-title'>
				<p>Events Request</p>

				<hr className='admin-horizontal-line' />
			</div>
			<div className='admin-table-section'>
				<div className='w-full h-[700px]'>
					{!loading ? (
						<DataGrid
							checkboxSelection={true}
							components={{ Toolbar: GridToolbar }}
							rowHeight={60}
							columns={columns}
							rows={requests && requests}
							getRowId={(row) => row.documentNo}
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
			<EventTable />
		</>
	);
}

export default EventRequestAdmin;
