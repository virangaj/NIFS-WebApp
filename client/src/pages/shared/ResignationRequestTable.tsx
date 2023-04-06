import { useEffect, useMemo, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import ResignationService from '../../services/admin/ResignationService';
import { useAppSelector } from '../../hooks/hooks';
import Ripple from '../../components/Ripple';

function ResignationRequestTable({ setSelectedData, getData }: any) {
	const [requests, setRequests] = useState<any>([]);
	const [pageSize, setPageSize] = useState(10);
	const [loading, setLoading] = useState(false);
	const [rowId, setRowId] = useState(0);

	const { auth } = useAppSelector((state) => state.persistedReducer);
	useEffect(() => {
		retriveData();
	}, []);

	useEffect(() => {
		retriveData();
	}, [getData]);

	const retriveData = () => {
		setLoading(true);
		setTimeout(() => {
			ResignationService.getAllResignationRequest(auth?.user?.token)
				.then((res) => {
					setRequests(res.data);
				})
				.then((e) => {
					console.log(e);
				});
			setLoading(false);
		}, 500);
	};

	const columns = useMemo(
		() => [
			{ field: 'documentNo', headerName: 'Document No', width: 175 },
			{
				field: 'epfNo',
				headerName: 'Employee',
				width: 100,
				editable: true,
			},
			{
				field: 'divisionId',
				headerName: 'Division ID',
				width: 100,
				editable: true,
			},
			{
				field: 'designationId',
				headerName: 'Designation ID',
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
				field: 'hod',
				headerName: 'HOD',
				width: 100,
				editable: true,
			},
			{
				field: 'hodApprove',
				headerName: 'HOD Approved',
				width: 100,
				editable: true,
			},
			{
				field: 'dirApproved',
				headerName: 'Dir / Sec Approved',
				width: 100,
				editable: true,
			},
			{
				field: 'remark',
				headerName: 'Remark',
				width: 300,
				editable: true,
			},
		],
		[rowId]
	);
	return (
		<div className='w-full h-[1000px]'>
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
					onCellEditCommit={(params: any) => setRowId(params.documentNo)}
					onSelectionModelChange={(d: any) => setSelectedData(d)}
				/>
			) : (
				<Ripple />
			)}
		</div>
	);
}

export default ResignationRequestTable;
