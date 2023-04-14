import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../hooks/hooks';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import TableAction from './shared/ProjectAction';
import FundingSourceService from '../../../services/common/FundingSourceService';
import FundingAction from './shared/FundingAction';

function ViewFundingSource() {
	const dispatch = useDispatch<any>();
	const [pageSize, setPageSize] = useState(10);
	const [rowId, setRowId] = useState(0);
	const [loading, setLoading] = useState(false);
	const [deleteId, setDeleteId] = useState('');
	const [fundingSources, setFundingSources] = useState<Array<any>>([]);
	const { auth } = useAppSelector((state) => state.persistedReducer);
	useEffect(() => {
		const filteredData = fundingSources.filter((p) => p.projectId !== deleteId);
		setFundingSources(filteredData);
	}, [deleteId]);

	useEffect(() => {
		retreiveProjects();
	}, []);
	//get all projects form the database
	const retreiveProjects = () => {
		FundingSourceService.getAllFundingServices()
			.then((res: any) => {
				setFundingSources(res.data);
			})
			.catch((e: any) => {
				console.log(e);
			});
	};

	const columns = useMemo(
		() => [
			{ field: 'fundingId', headerName: 'Id', width: 100 },
			{
				field: 'name',
				headerName: 'Funding Source Name',
				width: 300,
				editable: true,
			},
			{
				field: 'description',
				headerName: 'Description',
				width: 400,
				editable: true,
			},
			{
				field: 'locationId',
				headerName: 'Location',
				width: 100,
				editable: true,
			},
			{
				field: 'createdBy',
				headerName: 'Created By',
				width: 100,
				editable: true,
			},
			{
				field: 'actions',
				headerName: 'Action',
				type: 'actions',
				renderCell: (params: any) => (
					<FundingAction {...{ params, rowId, setRowId, setDeleteId }} />
				),
				width: 200,
			},
		],
		[rowId]
	);
	return (
		<>
			<h2 className='text-xl font-bold'>All Funding Sources</h2>
			<div className='w-full h-[700px]'>
				<DataGrid
					checkboxSelection={true}
					components={{ Toolbar: GridToolbar }}
					rowHeight={60}
					columns={columns}
					rows={fundingSources && fundingSources}
					getRowId={(row) => row.fundingId}
					rowsPerPageOptions={[5, 10, 20]}
					pageSize={pageSize}
					onPageSizeChange={(newPagesize) => setPageSize(newPagesize)}
					onCellEditCommit={(params: any) => setRowId(params.id)}
				/>
			</div>
		</>
	);
}

export default ViewFundingSource;
