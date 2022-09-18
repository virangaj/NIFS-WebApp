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




import IEventRequest from '../../types/EventRequest'
import { generateID } from '../../constant/generateId';
import CustomeDataPicker from '../../components/shared/DataPicker';

import Projects from '../../components/data/Project.json'
import CustomeTimePicker from '../../components/shared/TimePicker';

function EventRequest() {

    const [startDate, setStartDate] = React.useState<string | null>(null);
    const [startTime, setStartTime] = React.useState<string | null>(null);

    const [endDate, setEndDate] = React.useState<string | null>(null);
    const [endTime, setEndTime] = React.useState<string | null>(null);

    const [getEventId, setEventId] = useState<String | any>('')

    const [values, setValues] = useState<IEventRequest>({
        event_id: '',
        event_type: '',
        type: '',
        title: '',
        remarks: '',
        start_date: '',
        end_date: '',
        start_time: '',
        end_time: '',
        no_participants: 0,
        budget: 0,
        project: '',
        vote: '',
        location: '',
        venue_name: '',
        venue_type: '',
        fund_type: '',
    })



    useEffect(() => {
        setValues({
            event_id: values?.event_id,
            event_type: values?.event_type,
            type: values?.type,
            title: values?.title,
            remarks: values?.remarks,
            start_date: startDate ? startDate : '',
            end_date: endDate ? endDate : '',
            start_time: startTime ? startTime : '',
            end_time: endTime ? endTime : '',
            no_participants: values?.no_participants,
            budget: values?.budget,
            project: values?.project,
            vote: values?.vote,
            location: values?.location,
            venue_name: values?.venue_name,
            venue_type: values?.venue_type,
            fund_type: values?.fund_type,
        });
    }, [startDate, endDate, startTime, endTime])


    const generateEventId = () => {
        setEventId(generateID('SER'))
        console.log(getEventId)
    }




    const onChange = (e: any) => {
        setValues((preState) => ({
            ...preState,
            [e.target.name]: e.target.value
        }))
    }

    const resetForm = () => {
        setValues({
            event_id: '',
            event_type: '',
            type: '',
            title: '',
            remarks: '',
            start_date: '',
            end_date: '',
            start_time: '',
            end_time: '',
            no_participants: 0,
            budget: 0,
            project: '',
            vote: '',
            location: '',
            venue_name: '',
            venue_type: '',
            fund_type: '',
        })
        setStartDate('')
        setStartTime('')
        setEndDate('')
        setEndTime('')
    }

    const onSubmit = async (e: any) => {
        e.preventDefault();

        console.log(values)
    }

    return (
        <div className='sub-body-content !w-[95%]'>
            <h1 className='page-title'>Event Request</h1>
            <hr className='horizontal-line' />

            <form onSubmit={onSubmit}>
                <div className="form-flex">
                    <div className="form-left-section">
                    </div>
                </div>
                <div className="form-flex items-end">
                    <div className="form-left-section !w-[70%]">
                        <div className="grid grid-cols-3">
                            <Box className='input-field flex justify-between items-center'>
                                <TextField required
                                    id="outlined-basic"
                                    className='mr-10'
                                    label="Event ID"
                                    variant="outlined"
                                    type="text"
                                    name='event_id'
                                    onChange={onChange}
                                    defaultValue={getEventId}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />

                                <Button variant="contained" className='ml-10' onClick={generateEventId} size="large" color='success'>New</Button>
                            </Box>
                            <CustomeDataPicker date={startDate} setDate={setStartDate} title='Start Date' className='lg:ml-10 mx-0' />
                            <CustomeDataPicker date={endDate} setDate={setEndDate} title='End Date' className='lg:ml-10 mx-0' />

                            <Box className='input-field flex justify-between items-center'>
                                <TextField fullWidth required
                                    id="outlined-basic"
                                    className='mr-10'
                                    label="Event Type"
                                    variant="outlined"
                                    type="text"
                                    name='event_type'
                                    onChange={onChange}
                                    value={values.event_type}

                                />
                            </Box>

                            <CustomeTimePicker time={startTime} setTime={setStartTime} title='Start Time' className='lg:ml-10 mx-0' />
                            <CustomeTimePicker time={endTime} setTime={setEndTime} title='End Time' className='lg:ml-10 mx-0' />
                        </div>




                    </div>
                    <div className="form-right-section !w-[30%]">
                        <Box className='input-field lg:ml-4 mx-0'>
                            <InputLabel id="demo-simple-select-label" className='input-label'>Project *</InputLabel>
                            <Select
                                fullWidth

                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={values.project}
                                name='project'
                                size='small'
                                label="Project"
                                onChange={onChange}

                            >

                                <MenuItem value='' disabled>Select a Project</MenuItem>

                                {/* {Projects ? Projects.map((p, index) => (
                                        <MenuItem value={p.value} key={index}>{p.value}</MenuItem>
                                    )) : ''} */}



                            </Select>
                        </Box>
                    </div>
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

export default EventRequest