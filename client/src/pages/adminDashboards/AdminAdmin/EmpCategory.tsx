import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useMemo, useState } from 'react';
import Stack from '@mui/material/Stack';

import Box from '@mui/material/Box';
import { toast } from 'react-toastify';

import EmployeeCatService from '../../../services/admin/EmployeeCatService';
import EmpCatAction from './shared/EmpCatAction';
import Ripple from '../../../components/Ripple';
import ILocationData from '../../../types/ILocationData';
import LocationMasterService from '../../../services/admin/LocationMasterService';
import { HiX } from 'react-icons/hi';
import { RequestStatus } from '../../../constant/requestStatus';
import LocationColEdit from './shared/LocationColEdit';
import { useAppSelector } from '../../../hooks/hooks';

function EmpCategory() {
	const [empCats, setEmpCats] = useState<Array<any>>([]);
	const [pageSize, setPageSize] = useState(5);
	const [rowId, setRowId] = useState(0);
	const [loading, setLoading] = useState(false);
	const [cat_id, setCat_Id] = useState('');
	const [locationData, setLocationData] = useState<ILocationData[]>();
	const [deleteId, setDeleteId] = useState('');

	const { auth } = useAppSelector((state) => state.persistedReducer);

	const [values, setValues] = useState<any>({
		empCatId: '',
		description: '',
		otRate: '',
		locationId: '',
	});

	useEffect(() => {
		retreiveEmpCats();
		retreiveLocations();
	}, []);
	useEffect(() => {
		const filteredData = empCats.filter((emp) => emp.empCatId !== deleteId);
		setEmpCats(filteredData);
	}, [deleteId]);
	useEffect(() => {
		console.log(rowId);
	}, [rowId]);

	//set cat_id
	useEffect(() => {
		// console.log(v_id)
		setValues({
			empCatId: cat_id,
			description: values?.description,
			otRate: values?.otRate,
			locationId: values?.locationId,
		});
		// console.log(values)
	}, [cat_id]);

	//retrieve employee types
	const retreiveEmpCats = () => {
		EmployeeCatService.getAllEmpCategories()
			.then((res: any) => {
				if (res.data.status === RequestStatus.SUCCESS) {
					setEmpCats(res.data.data);
				} else {
					toast.error(`${res.data.message}`);
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
				// console.log(locationData);
			})
			.catch((e: any) => {
				console.log(e);
			});
	};
	const resetForm = () => {
		setValues({
			empCatId: '',
			description: '',
			otRate: '',
			locationId: '',
		});
		setCat_Id('');
	};
	const generateVenueID = () => {
		// window.location.reload;

		EmployeeCatService.getNewEmpCatId()
			.then((res: any) => {
				setCat_Id(res.data);
				// console.log(cat_id)
			})
			.catch((e: any) => {
				console.log(e);
			});
	};

	//onchange function
	const onChange = (e: any) => {
		setValues((preState: any) => ({
			...preState,
			[e.target.name]: e.target.value,
		}));
	};

	//add new employeee type
	const onSubmit = async (e: any) => {
		e.preventDefault();

		if (values.empCatId !== '') {
			setLoading(true);
			setTimeout(async () => {
				const result = await EmployeeCatService.saveEmpCat(
					values,
					auth?.user?.token
				);
				if (result.data.status === RequestStatus.SUCCESS) {
					toast.success('New Employee Category is added');
					resetForm();
				} else {
					toast.error('Request cannot completed!');
				}
				setLoading(false);
			}, 1000);
		} else {
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
			{ field: 'empCatId', headerName: 'Category Id', width: 160 },
			{
				field: 'description',
				headerName: 'Category Name',
				width: 200,
				editable: true,
			},
			{
				field: 'otRate',
				headerName: 'OT Rate',
				width: 200,
				editable: true,
			},
			{ field: 'locationId', headerName: 'Location', width: 200 },
			// {
			// 	field: 'locationId',
			// 	headerName: 'Location',
			// 	width: 200,
			// 	renderCell: (params: any) => (
			// 		<LocationColEdit {...{ params, setValues, locationData }} />
			// 	),
			// },
			{
				field: 'actions',
				headerName: 'Action',
				type: 'actions',
				renderCell: (params: any) => (
					<EmpCatAction {...{ params, rowId, setRowId, setDeleteId }} />
				),
				width: 200,
			},
		],
		[rowId]
	);

	return (
		<>
			<div className='admin-page-title'>
				<p>Employee Category</p>

				<hr className='admin-horizontal-line' />
			</div>

			<div className='admin-panel-flex'>
				<div className='admin-table-section'>
					<h2 className='text-lg font-bold'>All Employee Category</h2>
					<p className='hint-text'>(Double click to edit)</p>

					{/* {empCats?.map((emp: any, i: number) => (
						<EmpCatAction
							key={i}
							id={emp.employeeCategoryId}
							name={emp.description}
							location={emp.location}
                            otRate={emp.otRate}
						/>
					))} */}

					<Box sx={{ width: '1000px', height: '500px' }}>
						<DataGrid
							checkboxSelection={true}
							components={{ Toolbar: GridToolbar }}
							rowHeight={60}
							columns={columns}
							rows={empCats && empCats}
							getRowId={(row) => row.empCatId}
							rowsPerPageOptions={[5, 10, 20]}
							pageSize={pageSize}
							onPageSizeChange={(newPagesize) => setPageSize(newPagesize)}
							onCellEditCommit={(params: any) => setRowId(params.id)}
						/>
					</Box>
				</div>

				<div className='admin-form-section'>
					<h2 className='text-lg font-bold'>Add New Employee Category</h2>

					{!loading ? (
						<form onSubmit={onSubmit} className='admin-form'>
							<div className='generate-id-in-form'>
								<p className='flex items-center'>
									Category Id -{' '}
									{cat_id ? (
										<>
											{cat_id}
											<HiX
												className='text-xl cursor-pointer hover:text-red-600'
												onClick={() => setCat_Id('')}
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
								<label className='input-label' htmlFor='category'>
									Category
								</label>
								<input
									id='category'
									type='text'
									className='tailwind-text-box'
									onChange={onChange}
									value={values.description}
									name='description'
									required
								/>
							</div>

							<div>
								<label className='input-label' htmlFor='otRate'>
									OT Rate
								</label>
								<input
									id='otRate'
									type='text'
									className='tailwind-text-box'
									onChange={onChange}
									value={values.otRate}
									name='otRate'
									required
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

export default EmpCategory;
