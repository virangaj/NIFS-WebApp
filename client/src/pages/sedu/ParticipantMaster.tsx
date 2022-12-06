import React, { useState, useEffect } from 'react'

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import IVenueMaster from '../../types/VenueMaster';
import Autocomplete from '@mui/material/Autocomplete';


import IParticipantMaster from '../../types/ParticipantMaster';
import CustomeDataPicker from '../../components/DataPicker';
import ParticipantMasterService from '../../services/ParticipantMasterService';
import Ripple from '../../components/Ripple';


function ParticipantMaster() {

    const [participantCode, setParticipantsCode] = useState('')
    const [date, setDate] = React.useState<string | null>(null);

    const [loading, setLoading] = useState(false)


    const [values, setValues] = useState<IParticipantMaster>({
        p_code: '',
        date: '',
        p_name: '',
        nic: '',
        gender: '',
        address: '',
        contactNo: '',
        email: '',
        instituteName: '',
    });

    const onChange = (e: any) => {
        setValues((preState) => ({
            ...preState,
            [e.target.name]: e.target.value
        }))
    }

    useEffect(() => {
        setValues({
            p_code: participantCode ? participantCode : '',
            date: date ? date : '',
            p_name: values?.p_name,
            nic: values?.nic,
            gender: values?.gender,
            address: values?.address,
            contactNo: values?.contactNo,
            email: values?.email,
            instituteName: values?.instituteName,
        });
    }, [participantCode, date])

    const resetForm = () => {
        setValues({
            p_code: '',
            date: '',
            p_name: '',
            nic: '',
            gender: '',
            address: '',
            contactNo: '',
            email: '',
            instituteName: '',
        })



    }
    const onSubmit = async (e: any) => {
        e.preventDefault();

        try {
            setLoading(true)
            const result = await ParticipantMasterService.saveParticipant(values)
            alert('done')
        } catch (e: any) {
            setLoading(true)
            alert(e)
        }
        setLoading(false)


        console.log(values)
    }
    console.log(date)
    const participants = [
        { label: 'The Shawshank Redemption', year: 1994 },
        { label: 'The Godfather', year: 1972 },
        { label: 'The Godfather: Part II', year: 1974 },
        { label: 'The Dark Knight', year: 2008 },
        { label: '12 Angry Men', year: 1957 },
        { label: "Schindler's List", year: 1993 },
        { label: 'Pulp Fiction', year: 1994 }
    ]
    return (
        <div className='sub-body-content lg:!w-[60%]'>
            <h1 className='page-title'>Participant Master</h1>
            <hr className='horizontal-line' />



            {!loading ? <form onSubmit={onSubmit}>

                <div className='form-flex lg:w-[90%]'>
                    <Box className='input-field lg:mr-10 mx-0 !lg:w-[60%] w-[100%]'>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={participants}
                            isOptionEqualToValue={(option: any) => option.label}
                            onChange={(event, value: any) => { setParticipantsCode(value.label) }}
                            renderInput={(params) =>
                                <TextField {...params} fullWidth required label="Participant Code" name='participant' value={participantCode}
                                />}
                        />
                    </Box>

                    <CustomeDataPicker date={date} setDate={setDate} title='Date' className='lg:ml-10 mx-0' />
                </div>
                <Box className='input-field'>

                    <TextField fullWidth required
                        id="outlined-basic"
                        label="Participant Name"
                        variant="outlined"
                        type="text"
                        name='p_name'
                        size="small"
                        onChange={onChange}
                        value={values.p_name}
                        autoComplete='name'

                    />
                </Box>
                <div className='form-flex lg:w-[90%]'>

                    <Box className='input-field lg:mt-7 mt-0 lg:mr-4 mx-0'>

                        <TextField fullWidth required
                            id="outlined-basic"
                            label="NIC"
                            variant="outlined"
                            type="text"
                            name='nic'
                            size="small"
                            onChange={onChange}
                            value={values.nic}
                        />
                    </Box>


                    <Box className='input-field lg:ml-4 mx-0'>
                        <InputLabel id="demo-simple-select-label" className='input-label'>Gender</InputLabel>
                        <Select
                            fullWidth
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={values.gender}
                            name='gender'
                            size='small'
                            label="Venue Name"
                            onChange={onChange}
                            autoComplete='sex'
                        >
                            <MenuItem value='' disabled>Select Gender</MenuItem>
                            <MenuItem value='male'>Male</MenuItem>
                            <MenuItem value='female'>Female</MenuItem>

                        </Select>
                    </Box>
                </div>

                <Box className='input-field'>
                    <TextField
                        fullWidth required multiline id="outlined-basic"
                        label="Address"
                        variant="outlined"
                        type="search"
                        name='address'
                        size="small"
                        onChange={onChange}
                        value={values.address}

                    />
                </Box>

                <Box className='input-field'>
                    <TextField
                        fullWidth required id="outlined-basic"
                        label="Contact Number"
                        variant="outlined"
                        type="search"
                        name='contactNo'
                        size="small"
                        onChange={onChange}
                        value={values.contactNo}
                        autoComplete='tel'


                    />
                </Box>

                <Box className='input-field'>
                    <TextField
                        fullWidth required id="outlined-basic"
                        label="email"
                        variant="outlined"
                        type="email"
                        name='email'
                        size="small"
                        onChange={onChange}
                        value={values.email}
                        autoComplete='email'


                    />
                </Box>

                <Box className='input-field'>
                    <TextField
                        fullWidth required id="outlined-basic"
                        label="Institute Name"
                        variant="outlined"
                        type="search"
                        name='instituteName'
                        size="small"
                        onChange={onChange}
                        value={values.instituteName}

                    />
                </Box>


                <Stack
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="flex-end"
                    spacing={2}
                >
                    <Button variant="contained" type='reset' color="error" onClick={resetForm}>Reset</Button>
                    <Button variant="contained" type='submit'>Submit</Button>

                </Stack>
            </form>
                :
                <Ripple />
            }

        </div>
    )
}

export default ParticipantMaster