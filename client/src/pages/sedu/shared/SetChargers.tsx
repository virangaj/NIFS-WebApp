<<<<<<< HEAD
import React, { useState } from 'react'
=======
import React, { useState, useEffect } from "react";

>>>>>>> fd3210359d6c143215aef639c14815d77d7d10c7

import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';


import { HiPlusCircle, HiOutlineTrash } from "react-icons/hi";

<<<<<<< HEAD
import ChargersData from '../../../components/data/Chargers.json'
=======
// import ChargersData from '../../../components/data/Chargers.json'
import VenueOtherService from "../../../services/sedu/VenueOtherService";
>>>>>>> fd3210359d6c143215aef639c14815d77d7d10c7


function SetChargers({ setChargers, chargers }: any) {

<<<<<<< HEAD
    const [items, setItems] = useState<any[]>([]);
    const [newItem, setNewItem] = useState(0);
    const [cost, setCost] = useState('')

    const handleDelete = (id: any) => {
        setChargers((prev: any) => prev.filter((i: any) => i.id !== id))
    }

    const handleAdd = () => {

        if (newItem && cost) {
            let place = 0;
            ChargersData.map((data, index) => {
                if (data.id === newItem) {
=======
    // const [items, setItems] = useState<any[]>([]);
    const [newItem, setNewItem] = useState(0);
    const [cost, setCost] = useState('')
    const [chargesData, setChargesData] = useState<any[]>();

    useEffect(() => {
		retreiveCharges();
        // console.log(chargesData);
	}, []);

    // load all charges

    const retreiveCharges = () => {
		VenueOtherService.getAllCharges()
			.then((res: any) => {
				setChargesData(res.data);
				// console.log(res.data);
			})
			.catch((e: any) => {
				console.log(e);
			});
	};
    //  delete charge
    const handleDelete = (id: any) => {
        setChargers((prev: any) => prev.filter((i: any) => i.chargeId !== id))
    }

    useEffect(()=>{
        if(newItem){
            let place = 0;
            chargesData && chargesData.map((data, index) => {
                if (data.chargeId === newItem) {
                    place = index;
                }
            })

            setCost(newItem ? chargesData && chargesData[place].charge : null);
        }

    },[newItem])

    // add charge
    const handleAdd = () => {

        if (newItem) {
            let place = 0;
            chargesData && chargesData.map((data, index) => {
                if (data.chargeId === newItem) {
>>>>>>> fd3210359d6c143215aef639c14815d77d7d10c7
                    place = index;
                }
            })

            const item = {
<<<<<<< HEAD
                id: newItem ? ChargersData[place].id : null,
                value: newItem ? ChargersData[place].value : null,
                cost: cost ? cost : null
=======
                chargeId: newItem ? chargesData && chargesData[place].chargeId : null,
                name: newItem ? chargesData && chargesData[place].name : null,
                charge: newItem ? chargesData && chargesData[place].charge : null,
>>>>>>> fd3210359d6c143215aef639c14815d77d7d10c7
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
<<<<<<< HEAD
                            fullWidth

=======
                            sx={{width: '60%'}}
>>>>>>> fd3210359d6c143215aef639c14815d77d7d10c7
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name='newItem'
                            size='small'
                            label="Charge"
                            value={newItem}
<<<<<<< HEAD
                            onChange={(e: any) => setNewItem(e.target.value)}
                        >
                            <MenuItem value='' disabled>Select a Charge</MenuItem>
                            {ChargersData.map((data, index) =>
                                <MenuItem key={index} value={data.id}>{data.value}</MenuItem>
=======
                            onChange={(e: any) => {setNewItem(e.target.value)}}
                        >
                            <MenuItem value={0} disabled>Select a Charge</MenuItem>
                            {chargesData && chargesData.map((data, index) =>
                                <MenuItem key={index} value={data.chargeId}>{data.name}</MenuItem>
>>>>>>> fd3210359d6c143215aef639c14815d77d7d10c7
                            )}
                        </Select>
                    </div>

<<<<<<< HEAD
                    <TextField
=======
                    {/* <TextField
>>>>>>> fd3210359d6c143215aef639c14815d77d7d10c7
                        sx={{ marginLeft: '10px', marginRight: '10px', width: '60%' }}
                        id="outlined-basic"
                        label="Cost"
                        variant="outlined"
                        type="number"
                        name='cost'
                        size="small"
                        onChange={(e: any) => setCost(e.target.value)}
                        value={cost}

<<<<<<< HEAD
                    />
=======
                    /> */}
                    <p className="mr-20">
                        {cost && cost}
                    </p>
>>>>>>> fd3210359d6c143215aef639c14815d77d7d10c7



                    <div>
                        <HiPlusCircle className='form-icon' onClick={handleAdd} />
                    </div>
                </div>
            </Box>

            <div className='items-container'>
                <h1 className='new-item-title'>Chargers</h1>
                <hr className='horizontal-line' />
                {chargers.length !== 0 ? chargers.map((i: any, index: number) => (
<<<<<<< HEAD
                    <div className='items-container-text grid grid-cols-3 w-[100%] mb-4 lg:mb-0 items-center'>
                        <p key={index}>{i.value}</p>
                        <p key={index}>{i.cost}</p>
                        <HiOutlineTrash className='text-xl hover:text-red-500 cursor-pointer' onClick={() => handleDelete(i.id)} />
=======
                    <div className='items-container-text grid grid-cols-3 w-[100%] mb-4 lg:mb-2 items-center' key={index}>
                        <p>{i.name}</p>
                        <p>{i.charge}</p>
                        <HiOutlineTrash className='text-xl cursor-pointer hover:text-red-500' onClick={() => handleDelete(i.chargeId)} />
>>>>>>> fd3210359d6c143215aef639c14815d77d7d10c7

                    </div>
                ))
                    : <p className='items-container-text'>No Items to display</p>}
            </div>
        </>
    )
}

export default SetChargers
