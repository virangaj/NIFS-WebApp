import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useMemo, useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

import EmployeeCatService from '../../../services/admin/EmployeeCatService';
import EmpCatAction from './shared/EmpCatAction';
import EmpTypeAction from './shared/EmpTypeAction';
import Ripple from '../../../components/Ripple';
import ILocationData from '../../../types/LocationData';
import LocationMasterService from '../../../services/admin/LocationMasterService';
import { HiX } from 'react-icons/hi';
import { toast } from 'react-toastify';

function EmpCategory() {
	const [empCats, setEmpCats] = useState<Array<any>>([]);
	const [pageSize, setPageSize] = useState(5);
	const [rowId, setRowId] = useState(0);
	const [loading, setLoading] = useState(false);
	const [cat_id, setCat_Id] = useState('');
	const [locationData, setLocationData] = useState<ILocationData[]>();
	const [deleteId, setDeleteId] = useState('');

	const [values, setValues] = useState<any>({
		employeeCategoryId: '',
		description: '',
		otRate: '',
		location: '',
	});

	useEffect(() => {
		retreiveEmpCats();
		retreiveLocations();
	}, []);
	useEffect(() => {
		const filteredData = empCats.filter(
			(emp) => emp.employeeCategoryId !== deleteId
		);
		setEmpCats(filteredData);
	}, [deleteId]);
	useEffect(() => {
		console.log(rowId);
	}, [rowId]);

	//set cat_id
	useEffect(() => {
		// console.log(v_id)
		setValues({
			employeeCategoryId: cat_id,
			description: values?.description,
			otRate: values?.otRate,
			location: values?.location,
		});
		// console.log(values)
	}, [cat_id]);

	//retrieve employee types
	const retreiveEmpCats = () => {
		EmployeeCatService.getAllEmpCategories()
			.then((res: any) => {
				setEmpCats(res.data);
				console.log(empCats);
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
			employeeCategoryId: '',
			description: '',
			otRate: '',
			location: '',
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

		if (values.employeeCategoryId !== '') {
			setLoading(true);
			setTimeout(async () => {
				const result = await EmployeeCatService.saveEmpCat(values);
				if(result.data){
					toast.success('New Employee Category is added', {
						position: 'top-right',
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						
					});
					resetForm();
				}
				else{
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
			{ field: 'employeeCategoryId', headerName: 'Category Id', width: 160 },
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
			{ field: 'location', headerName: 'Location', width: 200 },
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
							rows={empCats}
							getRowId={(row) => row.employeeCategoryId}
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
								<label className='input-label' htmlFor='location'>
									Location
								</label>
								<select
									className='tailwind-text-box'
									value={values.location}
									id='location'
									name='location'
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
