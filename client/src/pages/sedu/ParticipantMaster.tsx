import React, { useState } from 'react'

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import IVenueMaster from '../../types/VenueMaster';
import Autocomplete from '@mui/material/Autocomplete';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import IParticipantMaster from '../../types/ParticipantMaster';

function ParticipantMaster() {

    const [participant, setParticipants] = useState('')
    const [date, setDate] = React.useState<string | null>(null);
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
        setValues({
            p_code: participant ? participant : '',
            date: date ? date : '',
            p_name: values?.p_name,
            nic: values?.nic,
            gender: values?.gender,
            address: values?.address,
            contactNo: values?.contactNo,
            email: values?.email,
            instituteName: values?.instituteName,
        })
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
        <div className='sub-body-content'>
            <h1 className='page-title'>Participant Master</h1>

            <form onSubmit={onSubmit}>

                <div className='flex-srction'>
                    <Box className='input-field'>
                        <Autocomplete
                            disablePortal
                            size='small'
                            id="combo-box-demo"
                            options={participants}
                            getOptionLabel={(option: any) => option.label}
                            onChange={(event, value: any) => { setParticipants(value.label) }}
                            renderInput={(params) =>
                                <TextField {...params} fullWidth required label="Location" name='locationName' value={participant}
                                />}
                        />
                    </Box>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            mask="__/__/____"
                            label="Date"
                            value={date}
                            onChange={(newValue) => {
                                setDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </div>

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


        </div>
    )
}

export default ParticipantMaster