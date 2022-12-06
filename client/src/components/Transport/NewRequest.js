import { Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
// import datepicker
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

// sample data files start here
import Projects from './shared/sampleData/Project.json';
import Funds from './shared/sampleData/Fund.json';
import ForwardedTo from './shared/sampleData/ForwardedTo.json';
import Divisions from './shared/sampleData/Division.json';
import Designations from './shared/sampleData/Designation.json';
import Employees from './shared/sampleData/Employee.json';
import { style } from '@mui/system';

const filter = createFilterOptions();
function NewRequest() {
	// sample data files ends here

	const [projectSet, setProjects] = useState(Projects);
	const [fundSet, setFunds] = useState(Funds);
	const [forwardedToSet, setForwardedTos] = useState(ForwardedTo);
	const [divisionSet, setDivisions] = useState(Divisions);
	const [designationSet, setDesignations] = useState(Designations);
	const [employeeSet, setEmployees] = useState(Employees);

	const [selectedEmployee, setSelectedEmployee] = useState(null);

	const [reqDate, setReqDate] = React.useState(null);
	const [reqToday, setReqToday] = React.useState(new Date());
	const [reqTime, setReqTime] = React.useState(null);

	// passenger array

	const [onePassenger, setOnePassenger] = useState('');
	const [passengerList, setPassengerList] = useState([]);

	// date set to be stored
	const [formDetils, setFormDetails] = useState({
		reqNo: '',
		project: '',
		fund: '',
		forwardTo: '',
		requestDate: '',
		time: '',
		estimateCost: '',
		travelType: '',
		travelMode: '',
		purpose: '',
		note: '',
		employee: '',
		designation: '',
		date: '',
		division: '',
		HOD: '',
		route: '',
		passengers: '',
	});

	const {
		reqNo,
		project,
		fund,
		forwardTo,
		requestDate,
		time,
		estimateCost,
		travelType,
		travelMode,
		purpose,
		note,
		employee,
		designation,
		date,
		division,
		HOD,
		route,
		passengers,
	} = formDetils;

	// reset form
	const resetForm = () => {
		setFormDetails({
			reqNo: '',
			project: '',
			fund: '',
			forwardTo: '',
			requestDate: '',
			time: '',
			estimateCost: '',
			travelType: '',
			travelMode: '',
			purpose: '',
			note: '',
			employee: '',
			designation: '',
			date: '',
			division: '',
			HOD: '',
			route: '',
			passengers: '',
		});
	};

	//onchange event in main form
	const onChange = (e) => {
		setFormDetails((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	// add Passenger
	const onPassengerChange = (e) => {
		setOnePassenger({ [e.target.name]: e.target.value });
		console.log(onePassenger);
	};
	const addPassenger = (e) => {
		e.preventDefault();
		console.log(onePassenger);
	};

	// form submit
	const submitDetails = (e) => {
		e.preventDefault();

		const getTime = reqTime.getHours() + ':' + reqTime.getMinutes();
		const getReqDate =
			reqDate.getMonth() +
			1 +
			'/' +
			reqDate.getDate() +
			'/' +
			reqDate.getFullYear();
		const getReqToday =
			reqToday.getMonth() +
			1 +
			'/' +
			reqToday.getDate() +
			'/' +
			reqToday.getFullYear();
		const newRequest = {
			reqNo,
			project,
			fund,
			forwardTo,
			requestDate: getReqDate,
			time: getTime,
			estimateCost,
			travelType,
			travelMode,
			purpose,
			note,
			employee: selectedEmployee,
			designation,
			date: getReqToday,
			division,
			HOD,
			route,
			passengers,
		};
		console.log(newRequest);
	};

	return (
		<div className="form-section">
			<h1>New Travel Request</h1>
			<form onSubmit={submitDetails}>
				<Box
					sx={{
						display: { xs: 'block', md: 'flex' },
						justifyContent: 'center',
					}}
				>
					{/* left section of the form */}
					<Box
						className="form-left"
						sx={{
							width: { xs: '90%', md: '50%' },
						}}
					>
						{/* Request number */}
						<Box className="input-fields">
							<label>Request Number</label>
							<TextField
								required
								fullWidth
								size="small"
								type="text"
								name="reqNo"
								onChange={onChange}
								value={reqNo}
								id="outlined-basic"
								label="Required"
								variant="outlined"
							/>
						</Box>

						{/* Select project */}

						<Box className="input-fields">
							<label>Project</label>
							<TextField
								fullWidth
								size="small"
								required
								id="outlined-select-project-native"
								select
								label="Required"
								name="project"
								onChange={onChange}
								value={project}
								SelectProps={{
									native: true,
								}}
								helperText="Please select a Project"
							>
								<option value="" selected disabled></option>
								{projectSet.map((option) => (
									<option key={option.id} value={option.value}>
										{option.value}
									</option>
								))}
							</TextField>
						</Box>

						{/* Select Fund */}

						<Box className="input-fields">
							<label>Fund</label>
							<TextField
								fullWidth
								size="small"
								required
								id="outlined-select-fund-native"
								select
								label="Required"
								name="fund"
								onChange={onChange}
								value={fund}
								SelectProps={{
									native: true,
								}}
							>
								<option value="" selected disabled></option>
								{fundSet.map((option) => (
									<option key={option.id} value={option.value}>
										{option.value}
									</option>
								))}
							</TextField>
						</Box>

						{/* Select Forward */}

						<Box className="input-fields">
							<label>Forward To</label>
							<TextField
								fullWidth
								size="small"
								required
								id="outlined-select-fund-native"
								select
								label="Required"
								name="forwardTo"
								onChange={onChange}
								value={forwardTo}
								SelectProps={{
									native: true,
								}}
							>
								<option value="" selected disabled></option>
								{forwardedToSet.map((option) => (
									<option key={option.id} value={option.value}>
										{option.value}
									</option>
								))}
							</TextField>
						</Box>

						{/*request date*/}

						<Box className="input-fields">
							<label>Request Date</label>
							<LocalizationProvider dateAdapter={AdapterDateFns}>
								<DatePicker
									required
									label="Required"
									value={reqDate}
									onChange={(newValue) => {
										setReqDate(newValue);
									}}
									renderInput={(params) => <TextField {...params} />}
								/>
							</LocalizationProvider>
						</Box>

						{/* Time picker */}

						<Box className="input-fields">
							<label>Time</label>
							<LocalizationProvider dateAdapter={AdapterDateFns}>
								<TimePicker
									required
									label="Required"
									value={reqTime}
									onChange={(newValue) => {
										setReqTime(newValue);
									}}
									renderInput={(params) => <TextField {...params} />}
								/>
							</LocalizationProvider>
						</Box>

						{/* cost */}

						<Box className="input-fields">
							<label>Estimate Cost</label>
							<TextField
								fullWidth
								size="small"
								required
								type="text"
								name="estimateCost"
								id="outlined-basic"
								label="Required"
								variant="outlined"
								onChange={onChange}
								value={estimateCost}
							/>
						</Box>

						{/* travel type */}

						<Box className="input-fields">
							<label>Type</label>
							<TextField
								fullWidth
								size="small"
								required
								id="outlined-select-forward-native"
								select
								label="Required"
								name="travelType"
								onChange={onChange}
								value={travelType}
								SelectProps={{
									native: true,
								}}
								helperText="Please select a Travel type"
							>
								<option value="" selected disabled></option>
								<option value="private">Private</option>
								<option value="official">Official</option>
							</TextField>
						</Box>

						{/* Travel mode */}

						<Box className="input-fields">
							<label>Mode of Travel</label>
							<TextField
								fullWidth
								size="small"
								required
								id="outlined-select-forward-native"
								select
								label="Required"
								name="travelMode"
								onChange={onChange}
								value={travelMode}
								SelectProps={{
									native: true,
								}}
								helperText="Please select a Travel mode"
							>
								<option value="" selected disabled></option>
								<option value="car">Car</option>
								<option value="van">Van</option>
								<option value="cab">Cab</option>
							</TextField>
						</Box>

						{/* purpose */}

						<Box className="input-fields">
							<label>Purpose</label>
							<TextField
								fullWidth
								size="small"
								required
								id="outlined-textarea"
								label="Required"
								name="purpose"
								onChange={onChange}
								value={purpose}
								SelectProps={{
									native: true,
								}}
								multiline
							/>
						</Box>
						{/* Note */}

						<Box className="input-fields">
							<label>Note</label>
							<TextField
								fullWidth
								size="small"
								required
								id="outlined-textarea"
								label="Required"
								name="note"
								onChange={onChange}
								value={note}
								SelectProps={{
									native: true,
								}}
								multiline
							/>
						</Box>
					</Box>

					{/* right section of the form */}

					<Box
						className="form-right"
						sx={{
							width: { xs: '90%', md: '50%' },
						}}
					>
						{/*request today date*/}

						<Box className="input-fields">
							<label>Date</label>

							<LocalizationProvider dateAdapter={AdapterDateFns}>
								<DatePicker
									required
									label="Required"
									value={reqToday}
									onChange={(newValue) => {
										setReqToday(newValue);
									}}
									renderInput={(params) => <TextField {...params} />}
								/>
							</LocalizationProvider>
						</Box>

						{/* employee select start*/}

						<Box className="input-fields">
							<label>Employee</label>

							<Autocomplete
								value={selectedEmployee}
								name="employee"
								onChange={(event, newValue) => {
									if (typeof newValue === 'string') {
										setSelectedEmployee({
											empName: newValue,
										});
									} else if (newValue && newValue.inputValue) {
										// Create a new value from the user input
										setSelectedEmployee({
											empName: newValue.inputValue,
										});
									} else {
										setSelectedEmployee(newValue);
									}
								}}
								filterOptions={(options, params) => {
									const filtered = filter(options, params);

									const { inputValue } = params;
									// Suggest the creation of a new value
									const isExisting = options.some(
										(option) => inputValue === option.value
									);

									return filtered;
								}}
								selectOnFocus
								clearOnBlur
								handleHomeEndKeys
								id="free-solo-with-text-demo"
								options={employeeSet}
								getOptionLabel={(option) => {
									return option.value;
								}}
								renderOption={(props, option) => (
									<li {...props}>{option.value}</li>
								)}
								sx={{ width: 300 }}
								freeSolo
								renderInput={(params) => (
									<TextField {...params} label="Required" required />
								)}
							/>
						</Box>

						{/* Employee select end */}

						{/* designations */}

						<Box className="input-fields">
							<label>Designation</label>
							<TextField
								fullWidth
								size="small"
								required
								id="outlined-select-forward-native"
								select
								label="Required"
								name="designation"
								onChange={onChange}
								value={designation}
								SelectProps={{
									native: true,
								}}
								helperText="Please select your Designation"
							>
								<option value="" selected disabled></option>
								{designationSet.map((option) => (
									<option key={option.id} value={option.value}>
										{option.value}
									</option>
								))}
							</TextField>
						</Box>

						{/* division */}

						<Box className="input-fields">
							<label>Division</label>
							<TextField
								fullWidth
								size="small"
								required
								id="outlined-select-forward-native"
								select
								label="Required"
								name="division"
								onChange={onChange}
								value={division}
								SelectProps={{
									native: true,
								}}
								helperText="Please select your Division"
							>
								<option value="" selected disabled></option>
								{divisionSet.map((option) => (
									<option key={option.id} value={option.value}>
										{option.value}
									</option>
								))}
							</TextField>
						</Box>

						{/* HOD */}
						<Box className="input-fields">
							<label>HOD</label>
							<TextField
								fullWidth
								size="small"
								required
								id="outlined-select-forward-native"
								select
								label="Required"
								name="HOD"
								onChange={onChange}
								value={HOD}
								SelectProps={{
									native: true,
								}}
								helperText="Please select your Division"
							>
								<option value="" selected disabled></option>
								{employeeSet.map((option) => (
									<option key={option.id} value={option.value}>
										{option.value}
									</option>
								))}
							</TextField>
						</Box>
						{/* Location / route */}

						<Box className="input-fields">
							<label>Location / Route</label>
							<TextField
								fullWidth
								size="small"
								required
								type="text"
								name="route"
								id="outlined-basic"
								label="Required"
								variant="outlined"
								onChange={onChange}
								value={route}
							/>
						</Box>

						{/* Location / route */}

						<Box className="input-fields">
							<label>Passengers</label>
							<Box
								style={{
									display: 'flex',
									justifyContent: 'space-around',
									width: '100%',
								}}
							>
								<TextField
									style={{ marginRight: '2vw' }}
									fullWidth
									size="small"
									type="text"
									name={onePassenger}
									id="outlined-basic"
									label="Required"
									variant="outlined"
									onChange={(e) => setOnePassenger(e.target.value)}
									value={passengers}
								/>
								<Button variant="contained" onClick={addPassenger}>
									ADD
								</Button>
							</Box>
						</Box>
					</Box>
				</Box>

				{/* submit button */}

				<Box style={{ display: 'flex', justifyContent: 'end' }}>
					<Button
						type="submit"
						variant="contained"
						style={{ marginRight: '2vw' }}
					>
						Submit
					</Button>

					<Button
						type="submit"
						variant="contained"
						color="warning"
						onClick={resetForm}
					>
						Clear
					</Button>
				</Box>
			</form>
		</div>
	);
}

export default NewRequest;
