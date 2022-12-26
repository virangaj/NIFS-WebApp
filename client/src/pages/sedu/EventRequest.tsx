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
import CustomeDataPicker from '../../components/DataPicker';


import CustomeTimePicker from '../../components/TimePicker';
import FileInput from '../../components/FileInput';
import EventRequestParticipants from './shared/EventRequestParticipants';

import Projects from '../../components/data/Project.json'

function EventRequest() {

    const [startDate, setStartDate] = React.useState<string | null>(null);
    const [startTime, setStartTime] = React.useState<string | null>(null);

    const [endDate, setEndDate] = React.useState<string | null>(null);
    const [endTime, setEndTime] = React.useState<string | null>(null);

    const [getEventId, setEventId] = useState<String | any>('')

    const [totalParticipants, setTotalParticipants] = useState([])

    const [eventAttachment, setEventAttachment] = useState<File | any>()

    const [values, setValues] = useState<IEventRequest>({
        eventId: '',
        eventType: '',
        type: '',
        title: '',
        remarks: '',
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        noParticipants: 0,
        budget: 0,
        project: '',
        vote: '',
        location: '',
        venueName: '',
        venueType: '',
        fundType: '',
    })


    useEffect(() => {
        setValues({
            eventId: getEventId,
            eventType: values?.eventType,
            type: values?.type,
            title: values?.title,
            remarks: values?.remarks,
            startDate: startDate ? startDate : '',
            endDate: endDate ? endDate : '',
            startTime: startTime ? startTime : '',
            endTime: endTime ? endTime : '',
            noParticipants: values?.noParticipants,
            budget: values?.budget,
            project: values?.project,
            vote: values?.vote,
            location: values?.location,
            venueName: values?.venueName,
            venueType: values?.venueType,
            fundType: values?.fundType,
        });
    }, [startDate, endDate, startTime, endTime, getEventId])



    const generateEventId = () => {
        setEventId(generateID('ER'))
        
    }




    const onChange = (e: any) => {
        setValues((preState) => ({
            ...preState,
            [e.target.name]: e.target.value
        }))
    }

    const resetForm = () => {
        setValues({
            eventId: '',
            eventType: '',
            type: '',
            title: '',
            remarks: '',
            startDate: '',
            endDate: '',
            startTime: '',
            endTime: '',
            noParticipants: 0,
            budget: 0,
            project: '',
            vote: '',
            location: '',
            venueName: '',
            venueType: '',
            fundType: '',
        })
        setStartDate('')
        setStartTime('')
        setEndDate('')
        setEndTime('')
        setEventId('')
    }

    const onSubmit = async (e: any) => {
        e.preventDefault();
        setValues({
            eventId: getEventId,
            eventType: values?.eventType,
            type: values?.type,
            title: values?.title,
            remarks: values?.remarks,
            startDate: values?.startDate,
            endDate: values?.endDate,
            startTime: values?.startTime,
            endTime: values?.endTime,
            noParticipants: values?.noParticipants,
            budget: values?.budget,
            project: values?.project,
            vote: values?.vote,
            location: values?.location,
            venueName: values?.venueName,
            venueType: values?.venueType,
            fundType: values?.fundType,
        });
        console.log(values)
        console.log(getEventId)
    }

    return (
        <div className='sub-body-content xl:!w-[90%] overflow-hidden'>
            <h1 className='page-title'>Event Request</h1>
            <hr className='horizontal-line' />

            <form onSubmit={onSubmit}>
                <div className="items-center form-flex">
                    <div className="form-left-section">
                    </div>
                </div>

                {/* grid section */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center w-[97%] mx-auto">

                    {/* event id */}

                    <Box className='flex items-center justify-between input-field'>
                        {/* <TextField required
                            id="outlined-basic"
                            label="Event ID"
                            variant="outlined"
                            type="text"
                            name='eventId'
                            onChange={onChange}
                            defaultValue={getEventId}
                            InputProps={{
                                readOnly: true,
                            }}
                        /> */}
                        Request ID - {getEventId && getEventId}
                        <Button variant="outlined" className='!ml-4' onClick={generateEventId} size="large" color='info'>New</Button>
                    </Box>

                    {/* start date */}
                    <div className='mx-0 mb-4 lg:ml-10 md:my-0' >
                        <CustomeDataPicker date={startDate} setDate={setStartDate} title='Start Date' />
                    </div>
                    {/* end date */}
                    <div className='mx-0 mb-4 lg:ml-10 md:my-0' >
                        <CustomeDataPicker date={endDate} setDate={setEndDate} title='End Date' />
                    </div>
                    {/* event type */}
                    <Box className='input-field'>
                        <InputLabel id="demo-simple-select-label" className='input-label'>Event Type *</InputLabel>
                        <Select
                            fullWidth

                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={values.eventType}
                            name='eventType'
                            size='small'
                            label="Event Type"
                            onChange={onChange}

                        >

                            <MenuItem value='' disabled>Select a Project</MenuItem>

                            {Projects ? Projects.map((p, index) => (
                                <MenuItem value={p.value} key={index}>{p.value}</MenuItem>
                            )) : ''}



                        </Select>
                    </Box>

                    {/* start time */}
                    <div className='mx-0 mb-4 lg:ml-10 md:my-0' >
                        <CustomeTimePicker time={startTime} setTime={setStartTime} title='Start Time' />
                    </div>

                    {/* end time */}
                    <div className='mx-0 mb-4 lg:ml-10 md:my-0' >
                        <CustomeTimePicker time={endTime} setTime={setEndTime} title='End Time' />
                    </div>

                    {/* type */}
                    <Box className='input-field'>
                        <InputLabel id="demo-simple-select-label" className='input-label'>Type *</InputLabel>
                        <Select
                            fullWidth

                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={values.type}
                            name='type'
                            size='small'
                            label="Type"
                            onChange={onChange}

                        >

                            <MenuItem value='' disabled>Select a Project</MenuItem>

                            {Projects ? Projects.map((p, index) => (
                                <MenuItem value={p.value} key={index}>{p.value}</MenuItem>
                            )) : ''}



                        </Select>
                    </Box>

                    {/* no of participants */}
                    <Box className='mx-0 input-field lg:ml-10'>
                        <TextField
                            fullWidth required id="outlined-basic"
                            label="No of Participants"
                            variant="outlined"
                            type="number"
                            name='noParticipants'
                            size="small"
                            onChange={onChange}
                            value={values.noParticipants}

                        />
                    </Box>

                    <Box className='mx-0 input-field lg:ml-10'>
                        <TextField
                            fullWidth required id="outlined-basic"
                            label="Expect Budget"
                            variant="outlined"
                            type="number"
                            name='budget'
                            size="small"
                            onChange={onChange}
                            value={values.budget}

                        />
                    </Box>


                </div>
                {/* event title */}
                <Box className='mx-0 input-field lg:ml-4'>

                    <TextField
                        fullWidth required multiline id="outlined-basic"
                        label="Event Title / Topic"
                        variant="outlined"
                        type="search"
                        name='title'
                        size="small"
                        onChange={onChange}
                        value={values.title}
                        rows={3}

                    />
                </Box>

                {/*remarks  */}
                <Box className='mx-0 input-field lg:ml-4'>

                    <TextField
                        fullWidth required multiline id="outlined-multiline-flexible"
                        label="Remarks"
                        variant="outlined"
                        type="search"
                        name='remarks'
                        size="small"
                        onChange={onChange}
                        value={values.remarks}
                        rows={3}

                    />
                </Box>

                <div className="items-center form-flex">
                    <div className="form-left-section">
                        {/* project */}
                        <Box className='mx-0 input-field lg:ml-4'>
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

                                {Projects ? Projects.map((p, index) => (
                                    <MenuItem value={p.value} key={index}>{p.value}</MenuItem>
                                )) : ''}



                            </Select>
                        </Box>

                    </div>
                    <div className="form-right-section">
                        {/* vote */}
                        <Box className='mx-0 input-field lg:ml-4'>
                            <InputLabel id="demo-simple-select-label" className='input-label'>Vote *</InputLabel>
                            <Select
                                fullWidth

                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={values.vote}
                                name='vote'
                                size='small'
                                label="Project"
                                onChange={onChange}

                            >

                                <MenuItem value='' disabled>Select a Project</MenuItem>

                                {Projects ? Projects.map((p, index) => (
                                    <MenuItem value={p.value} key={index}>{p.value}</MenuItem>
                                )) : ''}



                            </Select>
                        </Box>


                    </div>
                </div>
                <div className="items-center form-flex">
                    <div className="form-left-section">

                        {/* Budget */}
                        <Box className='mx-0 input-field lg:ml-4'>
                            <InputLabel id="demo-simple-select-label" className='input-label'>External /Fund Internal / Budget*</InputLabel>
                            <Select
                                fullWidth

                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={values.fundType}
                                name='fundType'
                                size='small'
                                label="Fund"
                                onChange={onChange}

                            >

                                <MenuItem value='' disabled>Select a Project</MenuItem>

                                {Projects ? Projects.map((p, index) => (
                                    <MenuItem value={p.value} key={index}>{p.value}</MenuItem>
                                )) : ''}



                            </Select>
                        </Box>
                    </div>
                    <div className="form-right-section">

                        {/* location */}
                        <Box className='mx-0 input-field lg:ml-4'>
                            <InputLabel id="demo-simple-select-label" className='input-label'>Location *</InputLabel>
                            <Select
                                fullWidth

                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={values.location}
                                name='location'
                                size='small'
                                label="Fund"
                                onChange={onChange}

                            >

                                <MenuItem value='' disabled>Select a Loation</MenuItem>

                                {Projects ? Projects.map((p, index) => (
                                    <MenuItem value={p.value} key={index}>{p.value}</MenuItem>
                                )) : ''}
                            </Select>
                        </Box>
                    </div>
                </div>
                <div className="items-center form-flex">
                    <div className="form-right-section">


                        {/* venue name */}
                        <Box className='mx-0 input-field lg:ml-4'>

                            <TextField
                                fullWidth required multiline id="outlined-multiline-flexible"
                                label="Venue Name"
                                variant="outlined"
                                type="search"
                                name='venueName'
                                size="small"
                                onChange={onChange}
                                value={values.venueName}


                            />
                        </Box>
                    </div>
                    <div className="form-right-section">
                        {/* Venue type */}
                        <Box className='mx-0 input-field lg:ml-4'>
                            <InputLabel id="demo-simple-select-label" className='input-label'>Venue Type *</InputLabel>
                            <Select
                                fullWidth labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={values.venueType}
                                name='venueType'
                                size='small'
                                label="Fund"
                                onChange={onChange}

                            >

                                <MenuItem value='' disabled>Select a Loation</MenuItem>

                                {Projects ? Projects.map((p, index) => (
                                    <MenuItem value={p.value} key={index}>{p.value}</MenuItem>
                                )) : ''}
                            </Select>
                        </Box>
                    </div>
                </div>

                <FileInput setEventAttachment={setEventAttachment} eventAttachment={eventAttachment} title="Upload Attachment" />

                <EventRequestParticipants total={totalParticipants} setTotal={setTotalParticipants} />
                <Stack
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="flex-end"
                    spacing={2}
                >
                    <Button variant="contained" type='reset' color="error" onClick={resetForm}>Reset</Button>
                    <Button variant="contained" type='submit'>Submit</Button>

                </Stack>
            </form >

        </div >
    )
}

export default EventRequest