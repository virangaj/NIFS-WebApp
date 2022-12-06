import React, { useState, useEffect } from "react";


import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';


import { HiPlusCircle, HiOutlineTrash } from "react-icons/hi";

// import ChargersData from '../../../components/data/Chargers.json'
import VenueOtherService from "../../../services/VenueOtherService";


function SetChargers({ setChargers, chargers }: any) {

    const [items, setItems] = useState<any[]>([]);
    const [newItem, setNewItem] = useState(0);
    const [cost, setCost] = useState('')
    const [chargesData, setChargesData] = useState<any[]>();

    useEffect(() => {
		retreiveCharges();
        console.log(chargesData);
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
                    place = index;
                }
            })

            const item = {
                chargeId: newItem ? chargesData && chargesData[place].chargeId : null,
                name: newItem ? chargesData && chargesData[place].name : null,
                charge: newItem ? chargesData && chargesData[place].charge : null,
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
                            sx={{width: '60%'}}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name='newItem'
                            size='small'
                            label="Charge"
                            value={newItem}
                            onChange={(e: any) => {setNewItem(e.target.value)}}
                        >
                            <MenuItem value='' disabled>Select a Charge</MenuItem>
                            {chargesData && chargesData.map((data, index) =>
                                <MenuItem key={index} value={data.chargeId}>{data.name}</MenuItem>
                            )}
                        </Select>
                    </div>

                    {/* <TextField
                        sx={{ marginLeft: '10px', marginRight: '10px', width: '60%' }}
                        id="outlined-basic"
                        label="Cost"
                        variant="outlined"
                        type="number"
                        name='cost'
                        size="small"
                        onChange={(e: any) => setCost(e.target.value)}
                        value={cost}

                    /> */}
                    <p className="mr-20">
                        {cost && cost}
                    </p>



                    <div>
                        <HiPlusCircle className='form-icon' onClick={handleAdd} />
                    </div>
                </div>
            </Box>

            <div className='items-container'>
                <h1 className='new-item-title'>Chargers</h1>
                <hr className='horizontal-line' />
                {chargers.length !== 0 ? chargers.map((i: any, index: number) => (
                    <div className='items-container-text grid grid-cols-3 w-[100%] mb-4 lg:mb-2 items-center'>
                        <p key={index}>{i.name}</p>
                        <p key={index}>{i.charge}</p>
                        <HiOutlineTrash className='text-xl hover:text-red-500 cursor-pointer' onClick={() => handleDelete(i.chargeId)} />

                    </div>
                ))
                    : <p className='items-container-text'>No Items to display</p>}
            </div>
        </>
    )
}

export default SetChargers
