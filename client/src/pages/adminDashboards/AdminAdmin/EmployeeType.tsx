import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useMemo, useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

import EmployeeTypeService from '../../../services/admin/EmployeeTypeService';
import EmpTypeRow from './shared/EmpTypeRow';
import EmpTypeAction from './shared/EmpTypeAction';
import Ripple from '../../../components/Ripple';
import ILocationData from '../../../types/LocationData';
import LocationMasterService from '../../../services/admin/LocationMasterService';
import ImportFromXlsx from './shared/ImportFromXlsx';

function EmployeeType() {
	const [empTypes, setEmpType] = useState<Array<any>>([]);
	const [pageSize, setPageSize] = useState(5);
	const [rowId, setRowId] = useState(0);
	const [loading, setLoading] = useState(false);
	const [t_id, setT_Id] = useState('');
	const [locationData, setLocationData] = useState<ILocationData[]>();

	const [values, setValues] = useState<any>({
		typeId: '',
		typeName: '',
		location: '',
	});

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
		console.log(values);
		if (values.typeId !== '') {
			setLoading(true);
			const result = await EmployeeTypeService.saveEmpType(values);
			alert('done');
			resetForm();
			setLoading(false);
		} else {
			alert('Please add a ID');
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
			},
			{
				field: 'actions',
				headerName: 'Action',
				type: 'actions',
				renderCell: (params: any) => (
					<EmpTypeAction {...{ params, rowId, setRowId }} />
				),
				width: 200,
			},
		],
		[rowId]
	);

	return (
		<>
			<h1 className="page-title">Employee Types</h1>
			<hr className="horizontal-line" />

			<div className="admin-panel-flex">
				<div>
					<h2 className="text-lg font-bold">All Employee Types</h2>
					<p className="hint-text">(Double click to edit)</p>

					{/* {empTypes?.map((emp: any, i: number) => (
						<EmpTypeRow
							key={i}
							id={emp.typeId}
							name={emp.typeName}
							location={emp.location}
						/>
					))} */}

					<Box sx={{ width: '800px', height: '500px' }}>
						<DataGrid
							components={{ Toolbar: GridToolbar }}
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
				<div className="p-4 mt-10 border-2 border-gray-400 rounded-lg w-96">
					<h2 className="text-lg font-bold">Add New Employee Type</h2>

					{!loading ? (
						<form
							onSubmit={onSubmit}
							className="mt-5"
						>
							<div className="flex items-center">
								<p>Type Id - {t_id ? t_id : ''}</p>
								<Button
									variant="outlined"
									onClick={generateVenueID}
									style={{ marginLeft: '20px' }}
								>
									New
								</Button>
							</div>
							<Box className="flex items-center mt-5">
								<p className="mr-5">Location</p>
								<Select
									className="w-44"
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={values.location}
									name="location"
									size="small"
									label="Location"
									onChange={onChange}
								>
									<MenuItem
										value=""
										disabled
									>
										Select Location
									</MenuItem>
									{locationData?.map((l: ILocationData, i: number) => {
										return (
											<MenuItem
												key={i}
												value={l.locationId}
											>
												{l.locationName}
											</MenuItem>
										);
									})}
								</Select>
							</Box>

							<Box className="flex items-center mt-5 mb-10">
								<TextField
									fullWidth
									required
									id="outlined-basic"
									label="Employee Type"
									variant="outlined"
									type="search"
									name="typeName"
									size="small"
									onChange={onChange}
									value={values.typeName}
								/>
							</Box>

							<Stack
								direction="row"
								justifyContent="flex-end"
								alignItems="flex-end"
								spacing={2}
							>
								<Button
									variant="contained"
									type="reset"
									color="error"
									onClick={resetForm}
								>
									Reset
								</Button>
								<Button
									variant="contained"
									type="submit"
								>
									Submit
								</Button>
							</Stack>
						</form>
					) : (
						<Ripple />
					)}
				</div>
			</div>

      <ImportFromXlsx/>
		</>
	);
}

export default EmployeeType;
