import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import EmployeeCatService from '../../../../services/admin/EmployeeCatService';
import LocationMasterService from '../../../../services/admin/LocationMasterService';
import IDesignationData from '../../../../types/DesignationData';
import IDivisionData from '../../../../types/DivisionData';
import IEmpCatData from '../../../../types/EmpCatData';
import IEmployeeData from '../../../../types/EmployeeData';
import IEmpTypeData from '../../../../types/EmpTypeData';
import ILocationData from '../../../../types/LocationData';
import EmployeeTypeService from '../../../../services/admin/EmployeeTypeService';
import DivisionMasterService from '../../../../services/admin/DivisionMasterService';
import DesignationMasterService from '../../../../services/admin/DesignationMasterService';

function AddEmployee() {
	const [startDate, setStartDate] = React.useState<string | null>(null);

	const [locationData, setLocationData] = useState<ILocationData[]>();
	const [employeeTypeData, setEmployeeTypeData] = useState<IEmpTypeData[]>();
	const [employeeCatData, setEmployeeCatData] = useState<IEmpCatData[]>();
	const [designationData, setDesignationData] = useState<IDesignationData[]>();
	const [divisionData, setDivisionData] = useState<IDivisionData[]>();

	const [empData, setEmpData] = useState<IEmployeeData>({
		epfNo: 1002,
		initials: '1002',
		firstName: '1002',
		lastName: '1002',
		gender: '',
		dob: new Date(),
		address: '1002',
		contactNo: '1002',
		email: '1002',
		nicNo: '1002',
		NicIssuedDate: new Date(),
		passportNo: '1002',
		PassExpireDate: new Date(),
		licenseNo: '1002',
		licenseIssuedDate: new Date(),
		licenseExpireDate: new Date(),
		contactPerson: '1002',
		cpRelationship: '1002',
		cpAddress: '1002',
		cpTelephone: '1002',
		cpStatus: '1002',
		cpCivilStatus: '1002',
		cpReligion: '1002',
		appointmentDate: new Date(),
		contractStart: new Date(),
		contractEnd: new Date(),
		location: '',
		empType: '',
		empCategory: '',
		designation: '',
		division: '',
	});

	useEffect(() => {
		retreiveLocations();
	}, []);

	// get location data
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

	// get other data on location selected
	useEffect(() => {
		retreiveOtherEmployeeData(empData?.location);
	}, [empData?.location]);

	const retreiveOtherEmployeeData = (id: string) => {
		if (empData?.location) {
			EmployeeCatService.getEmpCatByLocationId(id)
				.then((res: any) => {
					setEmployeeCatData(res.data);
					console.log(employeeCatData);
				})
				.catch((e: any) => {
					console.log(e);
				});

			EmployeeTypeService.getEmpTypeByLocationId(id)
				.then((res: any) => {
					setEmployeeTypeData(res.data);
					console.log(employeeTypeData);
				})
				.catch((e: any) => {
					console.log(e);
				});

			DivisionMasterService.getDivisionByLocationId(id)
				.then((res: any) => {
					setDivisionData(res.data);
					console.log(divisionData);
				})
				.catch((e: any) => {
					console.log(e);
				});

			DesignationMasterService.getDesignationByLocationId(id)
				.then((res: any) => {
					setDesignationData(res.data);
					console.log(designationData);
				})
				.catch((e: any) => {
					console.log(e);
				});
		}
	};

	const onChange = (e: any) => {
		setEmpData((preState) => ({
			...preState,
			[e.target.name]: e.target.value,
		}));
	};

	const resetForm = () => {
		setEmpData({
			epfNo: 1002,
			initials: '',
			firstName: '',
			lastName: '',
			gender: '',
			dob: new Date(),
			address: '',
			contactNo: '',
			email: '',
			nicNo: '',
			NicIssuedDate: new Date(),
			passportNo: '',
			PassExpireDate: new Date(),
			licenseNo: '',
			licenseIssuedDate: new Date(),
			licenseExpireDate: new Date(),
			contactPerson: '',
			cpRelationship: '',
			cpAddress: '',
			cpTelephone: '',
			cpStatus: '',
			cpCivilStatus: '',
			cpReligion: '',
			appointmentDate: new Date(),
			contractStart: new Date(),
			contractEnd: new Date(),
			location: '',
			empType: '',
			empCategory: '',
			designation: '',
			division: '',
		});
		// setStartDate('')
		// setStartTime('')
		// setEndDate('')
		// setEndTime('')
		// setEventId('')
	};

	const onSubmit = async (e: any) => {
		console.log('trigger');
	};

	return (
		<>
			<section className="w-full p-6 rounded-md shadow-md dark:bg-gray-800">
				<h1 className="text-xl font-bold text-white capitalize dark:text-white">
					Add New Employee
				</h1>
				<form>
					<div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 lg:grid-cols-3">
						<div>
							<label
								className="text-white dark:text-gray-200"
								htmlFor="epfNo"
							>
								EPF No
							</label>
							<input
								id="epfNo"
								type="text"
								className="tailwind-text-box"
								value={empData.epfNo}
								name='epfNo'
							/>
						</div>
						<div></div>
						<div></div>
						<div>
							<label
								className="text-white dark:text-gray-200"
								htmlFor="initials"
							>
								Initials
							</label>
							<input
								id="initials"
								type="text"
								className="tailwind-text-box"
								value={empData.initials}
								name='initials'
							/>
						</div>
						
						<div>
							<label
								className="text-white dark:text-gray-200"
								htmlFor="firstName"
							>
								First Name
							</label>
							<input
								id="firstName"
								type="text"
								className="tailwind-text-box"
								value={empData.firstName}
								name='firstName'
							/>
						</div>

						<div>
							<label
								className="text-white dark:text-gray-200"
								htmlFor="lastName"
							>
								Last Name
							</label>
							<input
								id="lastName"
								type="text"
								className="tailwind-text-box"
								value={empData.lastName}
								name='lastName'
							/>
						</div>

						<div>
							<label
								className="text-white dark:text-gray-200"
								htmlFor="gender"
							
							>
								Gender
							</label>
							<select className="tailwind-text-box" value={empData.gender} name='gender' id="gender"> 
								<option>Male</option>
								<option>Female</option>
							</select>
						</div>
					</div>

					<div className="flex justify-end mt-6">
						<button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">
							Save
						</button>
					</div>
				</form>
			</section>
		</>
	);
}

export default AddEmployee;
