import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

import { HiPlusCircle, HiOutlineTrash } from "react-icons/hi";

// import FacilityData from "../../../components/data/Facility.json";
import VenueOtherService from "../../../services/VenueOtherService";


function SelectFacility({ setFacilities, facilities }: any) {
	// console.log(FacilityData);
	const [items, setItems] = useState<any[]>([]);
	const [newItem, setNewItem] = useState(0);
	const [facilityData, setFacilityData] = useState<any[]>();

	useEffect(() => {
		retreiveFacility();
        console.log(facilityData);
	}, []);

	// load all facility data
	const retreiveFacility = () => {
		VenueOtherService.getAllFacilities()
			.then((res: any) => {
				setFacilityData(res.data);
				// console.log(res.data);
			})
			.catch((e: any) => {
				console.log(e);
			});
	};



	//delete facility 
	const handleDelete = (id: any) => {
		setFacilities((prev: any) => prev.filter((i: any) => i.facilityId !== id));
	};


	//add facility
	const handleAdd = () => {
		if (newItem) {
			let place = 0;
			facilityData && facilityData.map((data, index) => {
				if (data.facilityId === newItem) {
					place = index;
				}
			});

			const item = {
				facilityId: newItem ? facilityData && facilityData[place].facilityId : null,
				name: newItem ? facilityData && facilityData[place].name : null,
			};

			setFacilities((prev: any) => [...prev, item]);
		} else {
			alert("Select a Facility to add!");
		}
	};
	// console.log(items)

	return (
		<>
			<Box className="input-field">
				<div className="flex-section">
					<div className="input-field">
						<InputLabel id="demo-simple-select-label" className="input-label">
							Facility
						</InputLabel>
						<Select
							fullWidth
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							name="newItem"
							size="small"
							label="Venue Name"
							value={newItem}
							onChange={(e: any) => setNewItem(e.target.value)}
						>
							<MenuItem value="" disabled>
								Select a Facility
							</MenuItem>
							{facilityData && facilityData.map((data, index) => (
								<MenuItem key={index} value={data.facilityId}>
									{data.name}
								</MenuItem>
							))}
						</Select>
					</div>
					<div>
						<HiPlusCircle className="form-icon" onClick={handleAdd} />
					</div>
				</div>
			</Box>

			<div className="items-container">
				<h1 className="new-item-title">Facilities</h1>
				<hr className="horizontal-line" />
				{facilities.length !== 0 ? (
					facilities.map((i: any, index: number) => (
						<div className="flex-section mb-4 lg:mb-0">
							<p className="items-container-text" key={index}>
								{i.name}
							</p>
							<HiOutlineTrash
								className="text-xl hover:text-red-500 cursor-pointer"
								onClick={() => handleDelete(i.facilityId)}
							/>
						</div>
					))
				) : (
					<p className="items-container-text">No Items to display</p>
				)}
			</div>
		</>
	);
}

export default SelectFacility;
