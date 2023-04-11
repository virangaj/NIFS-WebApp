import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

import { HiPlusCircle, HiOutlineTrash } from 'react-icons/hi';

import VenueOtherService from '../../../services/sedu/VenueOtherService';

function SelectFacility({ setFacilities, facilities }: any) {
	// console.log(FacilityData);
	const [items, setItems] = useState<any[]>([]);
	const [newItem, setNewItem] = useState('');
	const [facilityData, setFacilityData] = useState<any[]>();

	useEffect(() => {
		retreiveFacility();
		// console.log(facilityData);
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
			facilityData &&
				facilityData.map((data, index) => {
					if (data.facilityId === newItem) {
						place = index;
					}
				});

			const item = {
				facilityId: newItem
					? facilityData && facilityData[place].facilityId
					: null,
				name: newItem ? facilityData && facilityData[place].name : null,
			};

			setFacilities((prev: any) => [...prev, item]);
		} else {
			alert('Select a Facility to add!');
		}
	};
	// console.log(items)

	return (
		<>
			<Box className='input-field'>
				<label className='input-label' htmlFor='newItem'>
					Facility
				</label>
				<div className='flex-section'>
					<div>
						<select
							className='w-full tailwind-text-box'
							value={newItem}
							id='newItem'
							name='newItem'
							onChange={(e: any) => setNewItem(e.target.value)}
						>
							<option value='' disabled>
								Select a Facility
							</option>
							{facilityData &&
								facilityData.map((data, index) => (
									<option key={index} value={data.facilityId}>
										{data.name}
									</option>
								))}
						</select>
					</div>
					<div>
						<HiPlusCircle className='form-icon' onClick={handleAdd} />
					</div>
				</div>
			</Box>

			<div className='items-container'>
				<h1 className='new-item-title'>Facilities</h1>
				<hr className='horizontal-line' />
				{facilities.length !== 0 ? (
					facilities.map((i: any, index: number) => (
						<div className='mb-4 flex-section lg:mb-2' key={index}>
							<p className='items-container-text'>{i.name}</p>
							<HiOutlineTrash
								className='text-xl cursor-pointer hover:text-red-500'
								onClick={() => handleDelete(i.facilityId)}
							/>
						</div>
					))
				) : (
					<p className='items-container-text'>No Items to display</p>
				)}
			</div>
		</>
	);
}

export default SelectFacility;
