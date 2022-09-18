import React, { useState } from 'react'

import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';


import { HiPlusCircle, HiOutlineTrash } from "react-icons/hi";

import FacilityData from '../../../components/data/Facility.json'


function SelectFacility({ setFacilities, facilities }: any) {

    // console.log(FacilityData);
    const [items, setItems] = useState<any[]>([]);
    const [newItem, setNewItem] = useState(0);


    const handleDelete = (id: any) => {
        setFacilities((prev: any) => prev.filter((i: any) => i.id !== id))
    }

    const handleAdd = () => {

        if (newItem) {
            let place = 0;
            FacilityData.map((data, index) => {
                if (data.id === newItem) {
                    place = index;
                }
            })

            const item = {
                id: newItem ? FacilityData[place].id : null,
                value: newItem ? FacilityData[place].value : null,
            }

            setFacilities((prev: any) => [...prev, item])
        }
        else {
            alert('Select a Facility to add!')
        }

    }
    // console.log(items)


    return (
        <>

            <Box className='input-field'>
                <div className='flex-section'>
                    <div className='input-field'>
                        <InputLabel id="demo-simple-select-label" className='input-label'>Facility</InputLabel>
                        <Select
                            fullWidth
                            required
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name='newItem'
                            size='small'
                            label="Venue Name"
                            value={newItem}
                            onChange={(e: any) => setNewItem(e.target.value)}
                        >
                            <MenuItem value='' disabled>Select a Facility</MenuItem>
                            {FacilityData.map((data, index) =>
                                <MenuItem key={index} value={data.id}>{data.value}</MenuItem>
                            )}
                        </Select>
                    </div>
                    <div>
                        <HiPlusCircle className='form-icon' onClick={handleAdd} />
                    </div>
                </div>
            </Box>

            <div className='items-container'>
                <h1 className='new-item-title'>Facilities</h1>
                <hr className='horizontal-line' />
                {facilities.length !== 0 ? facilities.map((i: any, index: number) => (
                    <div className='flex-section mb-4 lg:mb-0'>
                        <p className='items-container-text' key={index}>{i.value}</p>
                        <HiOutlineTrash className='text-xl hover:text-red-500 cursor-pointer' onClick={() => handleDelete(i.id)} />

                    </div>
                ))
                    : <p className='items-container-text'>No Items to display</p>}
            </div>

        </>
    )
}

export default SelectFacility
