import { useEffect, useMemo, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useAppSelector } from '../../../../hooks/hooks';
import VenueOtherService from '../../../../services/sedu/VenueOtherService';
import { toast } from 'react-toastify';
import ChargeAction from '../shared/ChargeAction';

function ChargeTable() {
	const [pageSize, setPageSize] = useState(10);
	const [rowId, setRowId] = useState(0);
	const [loading, setLoading] = useState(false);
	const [deleteId, setDeleteId] = useState('');
	const [chargeData, setChargeData] = useState<Array<any>>([]);
	const { auth } = useAppSelector((state) => state.persistedReducer);

	useEffect(() => {
		const filteredData = chargeData?.filter((c) => c.chargeId !== deleteId);
		setChargeData(filteredData);
	}, [deleteId]);

	useEffect(() => {
		retreiveChargeData();
	}, []);
	const retreiveChargeData = () => {
		VenueOtherService.getAllCharges()
			.then((res) => {
				console.log(res.data);
				setChargeData(res.data?.data);
			})
			.catch((e) => {
				console.log(e);
				toast.error('Cannot load Charge data');
			});
	};
	const columns = useMemo(
		() => [
			{ field: 'chargeId', headerName: 'Id', width: 160 },
			{
				field: 'name',
				headerName: 'Charge Name',
				width: 250,
				editable: true,
			},
			{
				field: 'charge',
				headerName: 'Charge amount',
				width: 200,
				editable: true,
			},
			{
				field: 'actions',
				headerName: 'Action',
				type: 'actions',
				renderCell: (params: any) => (
					<ChargeAction {...{ params, rowId, setRowId, setDeleteId }} />
				),
				width: 200,
			},
		],
		[rowId]
	);

	return (
		<DataGrid
			checkboxSelection={true}
			components={{ Toolbar: GridToolbar }}
			rowHeight={60}
			columns={columns}
			rows={chargeData && chargeData}
			getRowId={(row) => row.chargeId}
			rowsPerPageOptions={[10, 20, 30]}
			pageSize={pageSize}
			onPageSizeChange={(newPagesize) => setPageSize(newPagesize)}
			onCellEditCommit={(params: any) => setRowId(params.id)}
		/>
	);
}

export default ChargeTable;
