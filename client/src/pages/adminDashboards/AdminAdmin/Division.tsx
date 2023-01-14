import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useMemo, useState } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Ripple from '../../../components/Ripple';
import { HiX } from 'react-icons/hi';
import { toast } from 'react-toastify';

import ILocationData from '../../../types/LocationData';
import LocationMasterService from '../../../services/admin/LocationMasterService';
import IDivisionData from '../../../types/DivisionData';
import DivisionMasterService from '../../../services/admin/DivisionMasterService';
import DivisionAction from './shared/DivisionAction';
function Division() {
	const [pageSize, setPageSize] = useState(10);
	const [rowId, setRowId] = useState(0);
	const [loading, setLoading] = useState(false);
	const [deleteId, setDeleteId] = useState('');
	const [divisionData, setDivisionData] = useState<Array<IDivisionData>>([]);
	const [locationData, setLocationData] = useState<ILocationData[]>();
	const [d_id, setD_Id] = useState('');

	const [values, setValues] = useState<any>({
		divisionId: '',
		name: '',
		locationId: '',
	});
	useEffect(() => {
		const filteredData = divisionData?.filter(
			(emp) => emp.divisionId !== deleteId
		);
		setDivisionData(filteredData);
	}, [deleteId]);

	useEffect(() => {
		retreiveDivisions();
		retreiveLocations();
	}, []);

	useEffect(() => {
		// console.log(v_id)
		setValues({
			divisionId: d_id,
			name: values?.name,
			locationId: values?.locationId,
		});
		// console.log(values)
	}, [d_id]);

	const retreiveDivisions = () => {
		DivisionMasterService.getAllDivisions()
			.then((res: any) => {
				if (res.data.status === 1) {
					setDivisionData(res.data.data);
					// console.log(divisionData);
				} else {
					toast.error(`${res.data.message}`, {
						position: 'top-right',
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});
				}
			})
			.catch((e: any) => {
				console.log(e);
			});
	};

	const retreiveLocations = () => {
		LocationMasterService.getAllLocations()
			.then((res: any) => {
				setLocationData(res.data);
				console.log(locationData);
			})
			.catch((e: any) => {
				console.log(e);
			});
	};

	const resetForm = () => {
		setValues({
			divisionId: '',
			name: '',
			locationId: '',
		});
		setD_Id('');
	};
	const generateVenueID = () => {
		// window.location.reload;

		DivisionMasterService.getNewDivisionId()
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

		if (values.divisionId !== '') {
			setLoading(true);
			setTimeout(async () => {
				const result = await DivisionMasterService.saveDivision(values);
				if (result.data) {
					toast.success('New Division is added', {
						position: 'top-right',
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});

					resetForm();
				} else {
					toast.error('Request cannot completed!', {
						position: 'top-right',
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});
				}
				setLoading(false);
			}, 1000);
		} else {
			// alert('Please add a ID');
			toast.error('Please add an ID', {
				position: 'top-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
	};

	const columns = useMemo(
		() => [
			{ field: 'divisionId', headerName: 'Division Id', width: 160 },
			{
				field: 'name',
				headerName: 'Division Name',
				width: 200,
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
					<DivisionAction {...{ params, rowId, setRowId, setDeleteId }} />
				),
				width: 200,
			},
		],
		[rowId]
	);

	return (
		<>
			<div className='admin-page-title'>
				<p>Divisions</p>

				<hr className='admin-horizontal-line' />
			</div>

			<div className='admin-panel-flex'>
				<div className='admin-table-section'>
					<h2 className='text-lg font-bold'>All Divisions</h2>
					<p className='hint-text'>(Double click to edit)</p>

					<Box sx={{ width: '1000px', height: '700px' }}>
						<DataGrid
							checkboxSelection={true}
							components={{ Toolbar: GridToolbar }}
							rowHeight={60}
							columns={columns}
							rows={divisionData && divisionData}
							getRowId={(row) => row.divisionId}
							rowsPerPageOptions={[10, 20, 30]}
							pageSize={pageSize}
							onPageSizeChange={(newPagesize) => setPageSize(newPagesize)}
							onCellEditCommit={(params: any) => setRowId(params.id)}
						/>
					</Box>
				</div>

				{/* add new Division */}
				<div className='admin-form-section'>
					<h2 className='text-lg font-bold'>Add New Division</h2>

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
									{locationData?.map((l: ILocationData, i: number) => {
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
									Division
								</label>
								<input
									id='typeName'
									type='text'
									className='tailwind-text-box'
									onChange={onChange}
									name='name'
									value={values.name}
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

export default Division;
