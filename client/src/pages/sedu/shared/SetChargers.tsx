import React, { useState } from 'react'

import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';


import { HiPlusCircle, HiOutlineTrash } from "react-icons/hi";

import ChargersData from '../../../components/data/Chargers.json'


function SetChargers({ setChargers, chargers }: any) {

    const [items, setItems] = useState<any[]>([]);
    const [newItem, setNewItem] = useState(0);
    const [cost, setCost] = useState('')

    const handleDelete = (id: any) => {
        setChargers((prev: any) => prev.filter((i: any) => i.id !== id))
    }

    const handleAdd = () => {

        if (newItem) {
            let place = 0;
            ChargersData.map((data, index) => {
                if (data.id === newItem) {
                    place = index;
                }
            })

            const item = {
                id: newItem ? ChargersData[place].id : null,
                value: newItem ? ChargersData[place].value : null,
                cost: cost ? cost : null
            }

            setChargers((prev: any) => [...prev, item])
        }
        else {
            alert('Select Charges to add!')
        }

    }


    return (
        <>
            <Box className='input-field'>
                <div className='flex-section'>
                    <div className='input-field'>
                        <InputLabel id="demo-simple-select-label">Charges</InputLabel>
                        <Select
                            fullWidth
                            required
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name='newItem'
                            size='small'
                            label="Charge"
                            value={newItem}
                            onChange={(e: any) => setNewItem(e.target.value)}
                        >
                            <MenuItem value='' disabled>Select a Charge</MenuItem>
                            {ChargersData.map((data, index) =>
                                <MenuItem key={index} value={data.id}>{data.value}</MenuItem>
                            )}
                        </Select>
                    </div>

                    <TextField
                        sx={{ marginLeft: '10px', marginRight: '10px', width: '60%' }}
                        required id="outlined-basic"
                        label="Cost"
                        variant="outlined"
                        type="number"
                        name='cost'
                        size="small"
                        onChange={(e: any) => setCost(e.target.value)}
                        value={cost}

                    />



                    <div>
                        <HiPlusCircle className='form-icon' onClick={handleAdd} />
                    </div>
                </div>
            </Box>

            <div className='items-container'>
                {chargers.length !== 0 ? chargers.map((i: any, index: number) => (
                    <div className='flex-section '>
                        <p key={index}>{i.value}</p>
                        <p key={index}>{i.cost}</p>
                        <HiOutlineTrash className='text-xl hover:text-red-500 cursor-pointer' onClick={() => handleDelete(i.id)} />

                    </div>
                ))
                    : <p>No Items to display</p>}
            </div>
        </>
    )
}

export default SetChargers
