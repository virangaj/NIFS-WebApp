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

function EmpCategory() {
	const [empCats, setEmpCats] = useState<Array<any>>([]);
	const [pageSize, setPageSize] = useState(5);
	const [rowId, setRowId] = useState(0);
	const [loading, setLoading] = useState(false);
	const [cat_id, setCat_Id] = useState('');
	const [locationData, setLocationData] = useState<ILocationData[]>();

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
		console.log(values);

		if (values.typeId !== '') {
			setLoading(true);
			const result = await EmployeeCatService.saveEmpCat(values);
			alert('done');
			resetForm();
			setLoading(false);
		} else {
			alert('Please add a ID');
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
					<EmpCatAction {...{ params, rowId, setRowId }} />
				),
				width: 200,
			},
		],
		[rowId]
	);

	return (
		<>
			<h1 className="page-title">Employee Category</h1>
			<hr className="horizontal-line" />

			<div className="admin-panel-flex">
				<div>
					<h2 className="text-lg font-bold">All Employee Category</h2>
					<p className="hint-text">(Double click to edit)</p>

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
							components={{ Toolbar: GridToolbar }}
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

				<div className="p-4 mt-10 border-2 border-gray-400 rounded-lg w-96">
					<h2 className="text-lg font-bold">Add New Employee Category</h2>

					{!loading ? (
						<form
							onSubmit={onSubmit}
							className="mt-5"
						>
							<div className="flex items-center">
								<p>Category Id - {cat_id ? cat_id : ''}</p>
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

							<Box className="flex items-center mt-5">
								<TextField
									fullWidth
									required
									id="outlined-basic"
									label="Category"
									variant="outlined"
									type="search"
									name="description"
									size="small"
									onChange={onChange}
									value={values.description}
								/>
							</Box>

							<Box className="flex items-center mt-5 mb-10">
								<TextField
									fullWidth
									required
									id="outlined-basic"
									label="OT Rate"
									variant="outlined"
									type="search"
									name="otRate"
									size="small"
									onChange={onChange}
									value={values.otRate}
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
		</>
	);
}

export default EmpCategory;
