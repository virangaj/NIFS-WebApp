import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDispatch } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import Ripple from '../../../components/Ripple';
import { HiX } from 'react-icons/hi';
import { toast } from 'react-toastify';
import IDesignationData from '../../../types/IDesignationData';
import ILocationData from '../../../types/ILocationData';
import LocationMasterService from '../../../services/admin/LocationMasterService';
import DesignationMasterService from '../../../services/admin/DesignationMasterService';
import DesignationAction from './shared/DesignationAction';
import { RequestStatus } from '../../../constant/requestStatus';
import {
	createDesignation,
	getAllDesignations,
} from '../../../feature/admin/DesignationSlice';
import { getAllLocations } from '../../../feature/admin/LocationSlice';

function Designation() {
	const dispatch = useDispatch<any>();
	const [pageSize, setPageSize] = useState(10);
	const [rowId, setRowId] = useState(0);
	const [loading, setLoading] = useState(false);
	const [deleteId, setDeleteId] = useState('');
	const [designationData, setDesignationData] = useState<
		Array<IDesignationData>
	>([]);

	const [d_id, setD_Id] = useState('');

	const { auth } = useAppSelector((state) => state.persistedReducer);
	const { designation, designationIsLoading, designationIsSuccess } =
		useAppSelector((state) => state.designation);

	const { location, locationIsLoading, locationIsSuccess } = useAppSelector(
		(state) => state.location
	);

	const [values, setValues] = useState<any>({
		designationId: '',
		designationName: '',
		locationId: '',
	});

	//update on delete
	useEffect(() => {
		const filteredData = designationData?.filter(
			(emp) => emp.designationId !== deleteId
		);
		setDesignationData(filteredData);
	}, [deleteId]);

	useEffect(() => {
		setDesignationData(designation);
	}, [designation]);

	useEffect(() => {
		retreiveDesignations();
		if (location.length === 0 || !locationIsSuccess) {
			retreiveLocations();
		}
	}, []);

	useEffect(() => {
		// console.log(v_id)
		setValues({
			designationId: d_id,
			designationName: values?.designationName,
			locationId: values?.locationId,
		});
		// console.log(values)
	}, [d_id]);

	const retreiveDesignations = () => {
		dispatch(getAllDesignations(auth?.user?.token));
	};

	const retreiveLocations = () => {
		dispatch(getAllLocations());
	};
	const resetForm = () => {
		setValues({
			designationId: '',
			designationName: '',
			locationId: '',
		});
		setD_Id('');
	};
	const generateVenueID = () => {
		// window.location.reload;

		DesignationMasterService.getNewDesignationId()
			.then((res: any) => {
				setD_Id(res.data);
				// console.log(t_id)
			})
			.catch((e: any) => {
				console.log(e);
			});
	};
	const onChange = (e: any) => {
		setValues((preState: any) => ({
			...preState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = async (e: any) => {
		e.preventDefault();

		if (values.designationId !== '' && values.designationName !== null) {
			setLoading(true);
			setTimeout(async () => {
				const req = {
					data: values,
					token: auth?.user.token,
				};

				await dispatch(createDesignation(req))
					.then((res: any) => {
						console.log(res);
						toast.success('New Designation is Created!');
					})
					.catch((e: any) => {
						console.log(e);
						toast.error('Error Occured!');
					});

				setLoading(false);
			}, 1000);
		} else {
			// alert('Please add a ID');
			toast.error('Please fill up all the fields');
		}
	};

	const columns = useMemo(
		() => [
			{ field: 'designationId', headerName: 'Designation Id', width: 160 },
			{
				field: 'designationName',
				headerName: 'Designation Name',
				width: 250,
				editable: true,
			},
			{
				field: 'locationId',
				headerName: 'Location',
				width: 200,
				editable: true,
			},
			{
				field: 'actions',
				headerName: 'Action',
				type: 'actions',
				renderCell: (params: any) => (
					<DesignationAction {...{ params, rowId, setRowId, setDeleteId }} />
				),
				width: 200,
			},
		],
		[rowId]
	);

	return (
		<>
			<div className='admin-page-title'>
				<p>Employee Designations</p>

				<hr className='admin-horizontal-line' />
			</div>

			<div className='admin-panel-flex'>
				<div className='admin-table-section'>
					<h2 className='text-lg font-bold'>All Designations</h2>
					<p className='hint-text'>(Double click to edit)</p>

					<Box sx={{ width: '1000px', height: '700px' }}>
						<DataGrid
							checkboxSelection={true}
							components={{ Toolbar: GridToolbar }}
							rowHeight={60}
							columns={columns}
							rows={designationData && designationData}
							getRowId={(row) => row.designationId}
							rowsPerPageOptions={[10, 20, 30]}
							pageSize={pageSize}
							onPageSizeChange={(newPagesize) => setPageSize(newPagesize)}
							onCellEditCommit={(params: any) => setRowId(params.id)}
						/>
					</Box>
				</div>

				{/* add new Designations */}
				<div className='admin-form-section'>
					<h2 className='text-lg font-bold'>Add New Designation</h2>

					{!loading ? (
						<form onSubmit={onSubmit} className='admin-form'>
							<div className='generate-id-in-form'>
								<p className='flex items-center'>
									Type Id -{' '}
									{d_id ? (
										<>
											{d_id}
											<HiX
												className='text-xl cursor-pointer hover:text-red-600'
												onClick={() => setD_Id('')}
											/>
										</>
									) : (
										''
									)}
								</p>
								<button
									type='button'
									className='rounded-outline-success-btn'
									onClick={generateVenueID}
									style={{ marginLeft: '20px' }}
								>
									New
								</button>
							</div>
							<div>
								<label className='input-label' htmlFor='locationId'>
									Location
								</label>
								<select
									className='tailwind-text-box'
									value={values.locationId}
									id='location'
									name='locationId'
									onChange={onChange}
								>
									<option disabled value=''>
										Select Location
									</option>
									{location?.map((l: ILocationData, i: number) => {
										return (
											<option key={i} value={l.locationId}>
												{l.locationName}
											</option>
										);
									})}
								</select>
							</div>
							<div>
								<label className='input-label' htmlFor='typeName'>
									Designation
								</label>
								<input
									id='typeName'
									type='text'
									className='tailwind-text-box'
									onChange={onChange}
									name='designationName'
									value={values.designationName}
								/>
							</div>
							<Stack
								direction='row'
								justifyContent='flex-end'
								alignItems='flex-end'
								spacing={2}
								className='admin-form-buton-stack'
							>
								<button
									className='action-com-model-error-btn'
									type='reset'
									color='error'
									onClick={resetForm}
								>
									Reset
								</button>
								<button className='action-com-model-sucess-btn' type='submit'>
									Submit
								</button>
							</Stack>
						</form>
					) : (
						<Ripple />
					)}
				</div>
			</div>
		</>
	);
}

export default Designation;
