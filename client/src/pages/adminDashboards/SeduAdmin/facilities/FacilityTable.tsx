import { useEffect, useMemo, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useAppSelector } from '../../../../hooks/hooks';
import VenueOtherService from '../../../../services/sedu/VenueOtherService';
import { toast } from 'react-toastify';

function FacilityTable() {
	const [pageSize, setPageSize] = useState(10);
	const [rowId, setRowId] = useState(0);
	const [loading, setLoading] = useState(false);
	const [deleteId, setDeleteId] = useState('');
	const [facilityData, setFacilityData] = useState<Array<any>>([]);
	const { auth } = useAppSelector((state) => state.persistedReducer);

	useEffect(() => {
		const filteredData = facilityData?.filter((c) => c.chargeId !== deleteId);
		setFacilityData(filteredData);
	}, [deleteId]);
	useEffect(() => {
		retreiveFacilityData();
	}, []);
	const retreiveFacilityData = () => {
		VenueOtherService.getAllFacilities()
			.then((res) => {
				console.log(res.data);
				setFacilityData(res.data);
			})
			.catch((e) => {
				console.log(e);
				toast.error('Cannot load Charge data');
			});
	};
	const columns = useMemo(
		() => [
			{ field: 'facilityId', headerName: 'Id', width: 160 },
			{
				field: 'name',
				headerName: 'Charge Name',
				width: 250,
				editable: true,
			},
			{
				field: 'createdBy',
				headerName: 'Created By',
				width: 100,
				editable: true,
			},
			{
				field: 'createdOn',
				headerName: 'Created on',
				width: 200,
				editable: true,
			},
			{
				field: 'modifiedBy',
				headerName: 'Modified By',
				width: 100,
				editable: true,
			},
			{
				field: 'modifiedOn',
				headerName: 'Modified on',
				width: 200,
				editable: true,
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
			rows={facilityData && facilityData}
			getRowId={(row) => row.facilityId}
			rowsPerPageOptions={[10, 20, 30]}
			pageSize={pageSize}
			onPageSizeChange={(newPagesize) => setPageSize(newPagesize)}
			onCellEditCommit={(params: any) => setRowId(params.id)}
		/>
	);
}

export default FacilityTable;
