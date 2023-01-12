import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useMemo, useState } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import EmployeeTypeService from '../../../services/admin/EmployeeTypeService';
import EmpTypeAction from './shared/EmpTypeAction';
import Ripple from '../../../components/Ripple';
import ILocationData from '../../../types/LocationData';
import LocationMasterService from '../../../services/admin/LocationMasterService';
import ImportFromXlsx from './shared/ImportFromXlsx';
import { HiX } from 'react-icons/hi';
import { toast } from 'react-toastify';

function EmployeeType() {
	const [empTypes, setEmpType] = useState<Array<any>>([]);
	const [pageSize, setPageSize] = useState(5);
	const [rowId, setRowId] = useState(0);
	const [loading, setLoading] = useState(false);
	const [t_id, setT_Id] = useState('');
	const [locationData, setLocationData] = useState<ILocationData[]>();

	const [deleteId, setDeleteId] = useState('');

	const [values, setValues] = useState<any>({
		typeId: '',
		typeName: '',
		location: '',
	});

	useEffect(() => {
		const filteredData = empTypes.filter((emp) => emp.typeId !== deleteId);
		setEmpType(filteredData);
	}, [deleteId]);

	useEffect(() => {
		retreiveEmpTypes();
		retreiveLocations();
	}, []);

	useEffect(() => {
		console.log(rowId);
	}, [rowId]);

	//set t_id
	useEffect(() => {
		// console.log(v_id)
		setValues({
			typeId: t_id,
			typeName: values?.typeName,
			location: values?.location,
		});
		// console.log(values)
	}, [t_id]);

	//retrieve employee types
	const retreiveEmpTypes = () => {
		EmployeeTypeService.getAllEmpTypes()
			.then((res: any) => {
				setEmpType(res.data);
				console.log(empTypes);
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
			typeId: '',
			typeName: '',
			location: '',
		});
		setT_Id('');
	};
	const generateVenueID = () => {
		// window.location.reload;

		EmployeeTypeService.getNewEmpTypeId()
			.then((res: any) => {
				setT_Id(res.data);
				// console.log(t_id)
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

		if (values.typeId !== '') {
			setLoading(true);
			setTimeout(async () => {
				const result = await EmployeeTypeService.saveEmpType(values);
				if(result.data){
					toast.success('New Employee Type is added', {
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
			{ field: 'typeId', headerName: 'Type Id', width: 160 },
			{
				field: 'typeName',
				headerName: 'Type Name',
				width: 200,
				editable: true,
			},
			{
				field: 'location',
				headerName: 'Location',
				width: 200,
				editable: true,
			},
			{
				field: 'actions',
				headerName: 'Action',
				type: 'actions',
				renderCell: (params: any) => (
					<EmpTypeAction {...{ params, rowId, setRowId, setDeleteId }} />
				),
				width: 200,
			},
		],
		[rowId]
	);

	return (
		<>
			<div className='admin-page-title'>
				<p>Employee Types</p>

				<hr className='admin-horizontal-line' />
			</div>

			<div className='admin-panel-flex'>
				<div className='admin-table-section'>
					<h2 className='text-lg font-bold'>All Employee Types</h2>
					<p className='hint-text'>(Double click to edit)</p>

					{/* {empTypes?.map((emp: any, i: number) => (
						<EmpTypeRow
							key={i}
							id={emp.typeId}
							name={emp.typeName}
							location={emp.location}
						/>
					))} */}

					<Box sx={{ width: '1000px', height: '500px' }}>
						<DataGrid
							checkboxSelection={true}
							components={{ Toolbar: GridToolbar }}
							rowHeight={60}
							columns={columns}
							rows={empTypes}
							getRowId={(row) => row.typeId}
							rowsPerPageOptions={[5, 10, 20]}
							pageSize={pageSize}
							onPageSizeChange={(newPagesize) => setPageSize(newPagesize)}
							onCellEditCommit={(params: any) => setRowId(params.id)}
						/>
					</Box>
				</div>

				{/* add new employee type */}
				<div className='admin-form-section'>
					<h2 className='text-lg font-bold'>Add New Employee Type</h2>

					{!loading ? (
						<form onSubmit={onSubmit} className='admin-form'>
							<div className='generate-id-in-form'>
								<p className='flex items-center'>
									Type Id -{' '}
									{t_id ? (
										<>
											{t_id}
											<HiX
												className='text-xl cursor-pointer hover:text-red-600'
												onClick={() => setT_Id('')}
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
								<label className='input-label' htmlFor='typeName'>
									Employee Type
								</label>
								<input
									id='typeName'
									type='text'
									className='tailwind-text-box'
									onChange={onChange}
									name='typeName'
									value={values.typeName}
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

			<ImportFromXlsx />
		</>
	);
}

export default EmployeeType;
