import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import IProjects from '../../../types/common/IProjects';
import ProjectService from '../../../services/common/ProjectService';
import { useAppSelector } from '../../../hooks/hooks';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import TableAction from './shared/ProjectAction';

function ViewProjects() {
	const dispatch = useDispatch<any>();
	const [pageSize, setPageSize] = useState(10);
	const [rowId, setRowId] = useState(0);
	const [loading, setLoading] = useState(false);
	const [deleteId, setDeleteId] = useState('');
	const [projectData, setProjectData] = useState<Array<IProjects>>([]);
	const { auth } = useAppSelector((state) => state.persistedReducer);
	useEffect(() => {
		const filteredData = projectData.filter((p) => p.projectId !== deleteId);
		setProjectData(filteredData);
	}, [deleteId]);

	useEffect(() => {
		retreiveProjects();
	}, []);

	//get all projects form the database
	const retreiveProjects = () => {
		ProjectService.getAllProjects()
			.then((res: any) => {
				setProjectData(res.data);
			})
			.catch((e: any) => {
				console.log(e);
			});
	};

	const columns = useMemo(
		() => [
			{ field: 'projectId', headerName: 'Project Id', width: 100 },
			{
				field: 'projectName',
				headerName: 'Project Name',
				width: 300,
				editable: true,
			},
			{
				field: 'remark',
				headerName: 'Remark',
				width: 100,
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
					<TableAction {...{ params, rowId, setRowId, setDeleteId }} />
				),
				width: 200,
			},
		],
		[rowId]
	);

	return (
		<>
			<h2 className='text-xl font-bold'>All Projects</h2>
			<div className='w-full h-[700px]'>
				<DataGrid
					checkboxSelection={true}
					components={{ Toolbar: GridToolbar }}
					rowHeight={60}
					columns={columns}
					rows={projectData && projectData}
					getRowId={(row) => row.projectId}
					rowsPerPageOptions={[5, 10, 20]}
					pageSize={pageSize}
					onPageSizeChange={(newPagesize) => setPageSize(newPagesize)}
					onCellEditCommit={(params: any) => setRowId(params.id)}
				/>
			</div>
		</>
	);
}

export default ViewProjects;
