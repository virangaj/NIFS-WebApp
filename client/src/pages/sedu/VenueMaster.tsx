import React, { useState, useEffect } from 'react'

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Autocomplete from '@mui/material/Autocomplete';

import SelectFacility from './shared/SelectFacility'
import SetChargers from './shared/SetChargers';
import VenueMasterService from '../../services/VenueMasterService';
import IVenueMaster from '../../types/VenueMaster';
import Ripple from '../../components/Ripple';
import { generateID } from '../../constant/generateId';


import '../pages.css'
import VenueOtherService from '../../services/VenueOtherService';

function VenueMaster() {

    const [facilities, setFacilities] = useState<any[]>([]);
    const [chargers, setChargers] = useState<any[]>([]);
    const [locationName, setLocationName] = useState('')

    const [loading, setLoading] = useState(false)

    const [venue, setVenue] = useState([])
   

    const [v_id, setV_Id] = useState('');
    const [success, setSuccess] = useState(false)


    const [values, setValues] = useState<IVenueMaster>({
        venueId: "",
        venueName: "",
        type: "",
        availability: "",
        location: '',
        remark: "",
        capacity: 0,
        dateCreated: "",
    });




    const onChange = (e: any) => {
        setValues((preState) => ({
            ...preState,
            [e.target.name]: e.target.value
        }))
    }
    useEffect(()=>{
        console.log(v_id)
        setValues({
            venueId: v_id,
            venueName: values?.venueName,
            type: values?.type,
            availability: values?.availability,
            location: locationName ? locationName : "",
            remark: values?.remark,
            capacity: values?.capacity,
            dateCreated:"",

        })
        console.log(values)

    },[v_id])
    // generate id on button click
    const generateVenueID = () => {
        // window.location.reload;
        resetForm()
        VenueMasterService.getNewVenueId().then((res: any) => {
            setV_Id(res.data);
        }).catch((e: any) => {
            console.log(e)
        })

        let id = generateID('VM')
        // setV_Id(id)
        // console.log(v_id)

    }

    const resetForm = () => {
        setValues({
            venueId: '',
            venueName: "",
            type: "",
            availability: "",
            location: "",
            remark: "",
            capacity: 0,
            dateCreated: "",

        })
        setV_Id("")
        setFacilities([])
        setChargers([])
        setLocationName('')

    }
    const generateFirstId = () => {
        let x = Math.floor(Math.random() * 10000);

        const today = new Date();
        var time = today.getHours() + '' + today.getMinutes() + '' + today.getSeconds();
        const key = "VM"
        let firstId = x.toString().substring(0, 3) + key.toUpperCase() + time
        console.log(firstId)
        setValues({
            venueId: firstId,
            venueName: '',
            type: '',
            availability: '',
            location: "",
            remark: '',
            capacity: 0,
            dateCreated: "",
        });
    }
    useEffect(() => {

       
        retrieveVenue();
        // console.log(venue)
        generateFirstId()

    }, []);


   

    const retrieveVenue = () => {
        VenueMasterService.getAllVenues().then((res: any) => {
            setVenue(res.data)
            console.log(venue)

        }).catch((e: any) => {
            console.log(e)
        })
    }

    useEffect(() => {
        setValues({
            venueId: values?.venueId,
            venueName: values?.venueName,
            type: values?.type,
            availability: values?.availability,
            location: locationName ? locationName : "",
            remark: values?.remark,
            capacity: values?.capacity,
            dateCreated:"",

        });
    }, [locationName])


    const onSubmit = async (e: any) => {
        e.preventDefault();
        try {
            setLoading(true)
            const venuResult = await VenueMasterService.saveVenue(values);
            const facCharge = await VenueOtherService.setCharges(chargers, values.venueId);
            const facResult = await VenueOtherService.setFacilities(facilities, values.venueId);
            alert('done')
            setSuccess(true)
        } catch (e: any) {
            setLoading(true)
            setSuccess(false)
            alert(e)
        }


        if (success) {
            resetForm()
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
                        <Box className='input-field flex items-center justify-between'>
                            <p>Venue Id - {v_id ? v_id : ""}</p>
                            {/* <TextField fullWidth required
                                id="outlined-basic"
                                label="Venue ID"
                                variant="outlined"
                                type="text"
                                name='venueId'
                                size="small"
                                onChange={onChange}
                                defaultValue={values.venueId}
                                InputProps={{
                                    readOnly: true,
                                }}

                            /> */}
                            <Button variant="outlined" onClick={generateVenueID} style={{ marginLeft: '20px' }}>New</Button>

                        </Box>

                        <Box className='input-field'>
                            <TextField
                                fullWidth required id="outlined-basic"
                                label="Venue Name"
                                variant="outlined"
                                type="search"
                                name='venueName'
                                size="small"
                                onChange={onChange}
                                value={values.venueName}

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
                                <MenuItem value="Room">Room</MenuItem>
                                <MenuItem value="Lab">Lab</MenuItem>
                                <MenuItem value="Auditorium">Auditorium</MenuItem>

                               
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
                                label="Remark"
                                variant="outlined"
                                type="search"
                                name='remark'
                                size="small"
                                onChange={onChange}
                                value={values.remark}

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
                                <MenuItem value={0} disabled>Select Capacity</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={20}>20</MenuItem>
                                <MenuItem value={30}>30</MenuItem>
                                <MenuItem value={50}>50</MenuItem>
                                <MenuItem value={100}>100</MenuItem>

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