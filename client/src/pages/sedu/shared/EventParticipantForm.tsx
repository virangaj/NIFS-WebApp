import React, { useState, useEffect } from 'react'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { HiPlus, HiX } from "react-icons/hi";

import { generateID } from '../../../constant/generateId';



import '../../pages.css'

function EventParticipantForm({ type, total, setTotal }: any) {


    const [value, setValue] = useState({
        id: '',
        p_type: type,
        name: '',
        nic: '',
        contactNo: '',
        address: '',
        email: ''

    })

<<<<<<< HEAD
    const [getId, setId] = useState('');

    useEffect(() => {
        if (!getId) {
            setId(generateID(type.substring(0, 3)))
        }
        setId(generateID(type.substring(0, 3)))

    }, [value])




=======
    const [p_id, setP_id] = useState<String | any>('');

    useEffect(()=>{
        generateEventId();
        console.log("trigger "+ p_id)
        setValue({
            id: p_id,
            p_type: type,
            name: value?.name,
            nic: value?.nic,
            contactNo: value?.contactNo,
            address: value?.address,
            email: value?.email
        })
    }, [value.name])

    const generateEventId = () => {
        setP_id(generateID('PM'))
        
    }
>>>>>>> fd3210359d6c143215aef639c14815d77d7d10c7

    const onChange = (e: any) => {
        setValue((preState: any) => ({
            ...preState,
            [e.target.name]: e.target.value
        }));
    }


    const handleAdd = () => {
<<<<<<< HEAD

        console.log(generateID(type.substring(0, 3)))
        if (value.name !== '') {


=======
        setValue({
            id: p_id,
            p_type: type,
            name: value?.name,
            nic: value?.nic,
            contactNo: value?.contactNo,
            address: value?.address,
            email: value?.email
        })
        
        console.log(value)
        if (value.name !== '') {
>>>>>>> fd3210359d6c143215aef639c14815d77d7d10c7
            setTotal((prev: any) => [...prev, value]);
            reset()
        }
        else {
            alert('Please Enter value to Add!')
        }
    }




    const reset = () => {
        setValue({
<<<<<<< HEAD
            id: generateID(type.substring(0, 3)),
=======
            id: '',
>>>>>>> fd3210359d6c143215aef639c14815d77d7d10c7
            p_type: type,
            name: '',
            nic: '',
            contactNo: '',
            address: '',
            email: ''
        })
    }


    // console.log(total)


    return (
        <>
<<<<<<< HEAD
            <div className="flex flex-col sm:flex-row items-center justify-between">
=======
            <div className="flex flex-col items-center justify-between sm:flex-row">
>>>>>>> fd3210359d6c143215aef639c14815d77d7d10c7
                {/* name */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-between w-[100%]">
                    <Box className='w-[250px] mb-4'>
                        <TextField
                            fullWidth id="outlined-basic"
                            label="Name"
                            variant="outlined"
                            type="search"
                            name='name'
                            size="small"
                            onChange={onChange}
                            value={value.name}

                        />
                    </Box>

                    {/* nic number */}
                    <Box className='w-[250px] mb-4'>
                        <TextField
                            fullWidth id="outlined-basic"
                            label="NIC"
                            variant="outlined"
                            type="search"
                            name='nic'
                            size="small"
                            onChange={onChange}
                            value={value.nic}

                        />
                    </Box>

                    {/* contact number */}
                    <Box className='w-[250px] mb-4'>
                        <TextField
                            fullWidth id="outlined-basic"
                            label="Contact No"
                            variant="outlined"
                            type="search"
                            name='contactNo'
                            size="small"
                            onChange={onChange}
                            value={value.contactNo}

                        />
                    </Box>

                    {/* address */}
                    <Box className='w-[250px] mb-4'>
                        <TextField
                            fullWidth id="outlined-basic"
                            label="Address"
                            variant="outlined"
                            type="search"
                            name='address'
                            size="small"
                            onChange={onChange}
                            value={value.address}

                        />
                    </Box>

                    {/* email */}
                    <Box className='w-[250px] mb-4'>
                        <TextField
                            fullWidth id="outlined-basic"
                            label="Email"
                            variant="outlined"
                            type="search"
                            name='email'
                            size="small"
                            onChange={onChange}
                            value={value.email}

                        />
                    </Box>
                </div>


                <div className='flex items-center justify-between mb-4'>
                    <Button className='mr-10'> <HiPlus className='text-3xl' onClick={handleAdd} /></Button>
                    <Button color='error' className='ml-10'> <HiX className='text-3xl' onClick={reset} /></Button>
                </div>


            </div>


        </>
    )
}

export default EventParticipantForm
