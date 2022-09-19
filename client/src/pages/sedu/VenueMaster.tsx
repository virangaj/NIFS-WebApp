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



import '../pages.css'
import SelectFacility from './shared/SelectFacility';

import SetChargers from './shared/SetChargers';
import VenueMasterService from '../../services/VenueMasterService';
import Ripple from '../../components/Ripple';

function VenueMaster() {

    const venue_unique_id = "VM110040"
    const [facilities, setFacilities] = useState<any[]>([]);
    const [chargers, setChargers] = useState<any[]>([]);
    const [locationName, setLocationName] = useState('')

    const [loading, setLoading] = useState(false)

    const [venue, setVenue] = useState([])



    const [values, setValues] = useState<IVenueMaster>({
        venue_id: venue_unique_id,
        venue_name: "",
        type: "",
        availability: "",
        location: '',
        remarks: "",
        capacity: 0,
    });

    const onChange = (e: any) => {
        setValues((preState) => ({
            ...preState,
            [e.target.name]: e.target.value
        }))
    }

    const resetForm = () => {
        setValues({
            venue_id: venue_unique_id,
            venue_name: "",
            type: "",
            availability: "",
            location: "",
            remarks: "",
            capacity: 0,
        })
        setFacilities([])
        setChargers([])
        setLocationName('')

    }

    useEffect(() => {

        retrieveVenue()

    }, []);

    const retrieveVenue = () => {
        VenueMasterService.getAllVenues().then((res: any) => {
            setVenue(res.data.data)
        }).catch((e: any) => {
            console.log(e)
        })
    }

    useEffect(() => {
        setValues({
            venue_id: values?.venue_id,
            venue_name: values?.venue_name,
            type: values?.type,
            availability: values?.availability,
            location: locationName ? locationName : "",
            remarks: values?.remarks,
            capacity: values?.capacity,
        });
    }, [locationName])


    const onSubmit = async (e: any) => {
        e.preventDefault();
        try {
            setLoading(true)
            const result = await VenueMasterService.saveVenue(values)
            alert('done')
        } catch (e: any) {
            setLoading(true)
            alert(e)
        }
        setLoading(false)
        console.log(values)
    }
    const top100Films = [
        { label: 'The Shawshank Redemption', year: 1994 },
        { label: 'The Godfather', year: 1972 },
        { label: 'The Godfather: Part II', year: 1974 },
        { label: 'The Dark Knight', year: 2008 },
        { label: '12 Angry Men', year: 1957 },
        { label: "Schindler's List", year: 1993 },
        { label: 'Pulp Fiction', year: 1994 }
    ]

    return (
        <div className='sub-body-content xl:!w-[60%]'>
            <h1 className='page-title'>Venue Master</h1>
            <hr className='horizontal-line' />


            {!loading ? <form onSubmit={onSubmit}>


                <div className="form-flex">
                    <div className="form-left-section">
                        <Box className='input-field'>

                            <TextField fullWidth required
                                id="outlined-basic"
                                label="Venue ID"
                                variant="outlined"
                                type="text"
                                name='venue_id'
                                size="small"
                                onChange={onChange}
                                defaultValue={values.venue_id}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Box>

                        <Box className='input-field'>
                            <TextField
                                fullWidth required id="outlined-basic"
                                label="Venue Name"
                                variant="outlined"
                                type="search"
                                name='venue_name'
                                size="small"
                                onChange={onChange}
                                value={values.venue_name}

                            />
                        </Box>

                        <Box className='input-field'>
                            <InputLabel id="demo-simple-select-label" className='input-label'>Venue Type</InputLabel>
                            <Select
                                fullWidth
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={values.type}
                                name='type'
                                size='small'
                                label="Venue Type"
                                onChange={onChange}
                            >
                                {/* <MenuItem value='' disabled>Select a Type</MenuItem> */}
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </Box>

                        <SelectFacility setFacilities={setFacilities} facilities={facilities} />

                        <Box className='input-field'>

                            <TextField
                                fullWidth required id="outlined-basic"
                                label="Availability"
                                variant="outlined"
                                type="search"
                                name='availability'
                                size="small"
                                onChange={onChange}
                                value={values.availability}

                            />
                        </Box>

                    </div>

                    {/* form right section */}
                    <div className="form-right-section">

                        <Box className='input-field'>
                            <Autocomplete
                                disablePortal
                                size='small'
                                id="combo-box-demo"
                                options={top100Films}
                                isOptionEqualToValue={(option: any) => option.label}
                                onChange={(event, value: any) => { setLocationName(value.label) }}
                                renderInput={(params) =>
                                    <TextField {...params} fullWidth required label="Location" name='locationName' value={locationName}
                                    />}
                            />
                        </Box>


                        <Box className='input-field'>

                            <TextField
                                fullWidth required multiline id="outlined-multiline-flexible"
                                label="Remarks"
                                variant="outlined"
                                type="search"
                                name='remarks'
                                size="small"
                                onChange={onChange}
                                value={values.remarks}

                            />
                        </Box>

                        <Box className='input-field'>
                            <InputLabel id="demo-simple-select-label" className='input-label'>Capacity</InputLabel>
                            <Select
                                fullWidth
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={values.capacity}
                                name='capacity'
                                size='small'
                                label="Venue Name"
                                onChange={onChange}
                            >
                                {/* <MenuItem value='' disabled>Select Capacity</MenuItem> */}
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </Box>

                        <SetChargers chargers={chargers} setChargers={setChargers} />
                    </div>
                </div>
                {/* button stack */}
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

export default VenueMaster