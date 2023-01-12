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
<<<<<<< HEAD
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
=======
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
>>>>>>> fd3210359d6c143215aef639c14815d77d7d10c7
        budget: 0,
        project: '',
        vote: '',
        location: '',
<<<<<<< HEAD
        venue_name: '',
        venue_type: '',
        fund_type: '',
=======
        venueName: '',
        venueType: '',
        fundType: '',
>>>>>>> fd3210359d6c143215aef639c14815d77d7d10c7
    })


    useEffect(() => {
        setValues({
<<<<<<< HEAD
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
=======
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
>>>>>>> fd3210359d6c143215aef639c14815d77d7d10c7
            budget: values?.budget,
            project: values?.project,
            vote: values?.vote,
            location: values?.location,
<<<<<<< HEAD
            venue_name: values?.venue_name,
            venue_type: values?.venue_type,
            fund_type: values?.fund_type,
        });
    }, [startDate, endDate, startTime, endTime])


    const generateEventId = () => {
        setEventId(generateID('SER'))
        console.log(getEventId)
=======
            venueName: values?.venueName,
            venueType: values?.venueType,
            fundType: values?.fundType,
        });
    }, [startDate, endDate, startTime, endTime, getEventId])



    const generateEventId = () => {
        setEventId(generateID('ER'))
>>>>>>> fd3210359d6c143215aef639c14815d77d7d10c7
    }




    const onChange = (e: any) => {
        setValues((preState) => ({
            ...preState,
            [e.target.name]: e.target.value
        }))
    }

    const resetForm = () => {
        setValues({
<<<<<<< HEAD
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
=======
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
>>>>>>> fd3210359d6c143215aef639c14815d77d7d10c7
            budget: 0,
            project: '',
            vote: '',
            location: '',
<<<<<<< HEAD
            venue_name: '',
            venue_type: '',
            fund_type: '',
=======
            venueName: '',
            venueType: '',
            fundType: '',
>>>>>>> fd3210359d6c143215aef639c14815d77d7d10c7
        })
        setStartDate('')
        setStartTime('')
        setEndDate('')
        setEndTime('')
<<<<<<< HEAD
=======
        setEventId('')
>>>>>>> fd3210359d6c143215aef639c14815d77d7d10c7
    }

    const onSubmit = async (e: any) => {
        e.preventDefault();
<<<<<<< HEAD

        console.log(values)
=======
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
>>>>>>> fd3210359d6c143215aef639c14815d77d7d10c7
    }

    return (
        <div className='sub-body-content xl:!w-[90%] overflow-hidden'>
            <h1 className='page-title'>Event Request</h1>
            <hr className='horizontal-line' />

            <form onSubmit={onSubmit}>
<<<<<<< HEAD
                <div className="form-flex items-center">
=======
                <div className="items-center form-flex">
>>>>>>> fd3210359d6c143215aef639c14815d77d7d10c7
                    <div className="form-left-section">
                    </div>
                </div>

                {/* grid section */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center w-[97%] mx-auto">

                    {/* event id */}

<<<<<<< HEAD
                    <Box className='input-field flex items-center'>
                        <TextField required
=======
                    <Box className='flex items-center justify-between input-field'>
                        {/* <TextField required
>>>>>>> fd3210359d6c143215aef639c14815d77d7d10c7
                            id="outlined-basic"
                            label="Event ID"
                            variant="outlined"
                            type="text"
<<<<<<< HEAD
                            name='event_id'
=======
                            name='eventId'
>>>>>>> fd3210359d6c143215aef639c14815d77d7d10c7
                            onChange={onChange}
                            defaultValue={getEventId}
                            InputProps={{
                                readOnly: true,
                            }}
<<<<<<< HEAD
                        />

                        <Button variant="outlined" className='!ml-4' onClick={generateEventId} size="large" color='info'>New</Button>
                    </Box>

                    {/* start date */}
                    <div className='lg:ml-10 mx-0 mb-4 md:my-0' >
                        <CustomeDataPicker date={startDate} setDate={setStartDate} title='Start Date' />
                    </div>
                    {/* end date */}
                    <div className='lg:ml-10 mx-0 mb-4 md:my-0' >
=======
                        /> */}
                        Request ID - {getEventId && getEventId}
                        <button type='button' className='rounded-outline-success-btn' onClick={generateEventId} style={{ marginLeft: '20px' }}>New</button>
                    </Box>

                    {/* start date */}
                    <div className='mx-0 mb-4 lg:ml-10 md:my-0' >
                        <CustomeDataPicker date={startDate} setDate={setStartDate} title='Start Date' />
                    </div>
                    {/* end date */}
                    <div className='mx-0 mb-4 lg:ml-10 md:my-0' >
>>>>>>> fd3210359d6c143215aef639c14815d77d7d10c7
                        <CustomeDataPicker date={endDate} setDate={setEndDate} title='End Date' />
                    </div>
                    {/* event type */}
                    <Box className='input-field'>
                        <InputLabel id="demo-simple-select-label" className='input-label'>Event Type *</InputLabel>
                        <Select
                            fullWidth

                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
<<<<<<< HEAD
                            value={values.event_type}
                            name='event_type'
=======
                            value={values.eventType}
                            name='eventType'
>>>>>>> fd3210359d6c143215aef639c14815d77d7d10c7
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
<<<<<<< HEAD
                    <div className='lg:ml-10 mx-0 mb-4 md:my-0' >
=======
                    <div className='mx-0 mb-4 lg:ml-10 md:my-0' >
>>>>>>> fd3210359d6c143215aef639c14815d77d7d10c7
                        <CustomeTimePicker time={startTime} setTime={setStartTime} title='Start Time' />
                    </div>

                    {/* end time */}
<<<<<<< HEAD
                    <div className='lg:ml-10 mx-0 mb-4 md:my-0' >
=======
                    <div className='mx-0 mb-4 lg:ml-10 md:my-0' >
>>>>>>> fd3210359d6c143215aef639c14815d77d7d10c7
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
<<<<<<< HEAD
                    <Box className='input-field lg:ml-10 mx-0'>
=======
                    <Box className='mx-0 input-field lg:ml-10'>
>>>>>>> fd3210359d6c143215aef639c14815d77d7d10c7
                        <TextField
                            fullWidth required id="outlined-basic"
                            label="No of Participants"
                            variant="outlined"
                            type="number"
<<<<<<< HEAD
                            name='no_participants'
                            size="small"
                            onChange={onChange}
                            value={values.no_participants}
=======
                            name='noParticipants'
                            size="small"
                            onChange={onChange}
                            value={values.noParticipants}
>>>>>>> fd3210359d6c143215aef639c14815d77d7d10c7

                        />
                    </Box>

<<<<<<< HEAD
                    <Box className='input-field lg:ml-10 mx-0'>
=======
                    <Box className='mx-0 input-field lg:ml-10'>
>>>>>>> fd3210359d6c143215aef639c14815d77d7d10c7
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
<<<<<<< HEAD
                <Box className='input-field lg:ml-4 mx-0'>
=======
                <Box className='mx-0 input-field lg:ml-4'>
>>>>>>> fd3210359d6c143215aef639c14815d77d7d10c7

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
<<<<<<< HEAD
                <Box className='input-field lg:ml-4 mx-0'>
=======
                <Box className='mx-0 input-field lg:ml-4'>
>>>>>>> fd3210359d6c143215aef639c14815d77d7d10c7

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

<<<<<<< HEAD
                <div className="form-flex items-center">
                    <div className="form-left-section">
                        {/* project */}
                        <Box className='input-field lg:ml-4 mx-0'>
=======
                <div className="items-center form-flex">
                    <div className="form-left-section">
                        {/* project */}
                        <Box className='mx-0 input-field lg:ml-4'>
>>>>>>> fd3210359d6c143215aef639c14815d77d7d10c7
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
<<<<<<< HEAD
                        <Box className='input-field lg:ml-4 mx-0'>
=======
                        <Box className='mx-0 input-field lg:ml-4'>
>>>>>>> fd3210359d6c143215aef639c14815d77d7d10c7
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
<<<<<<< HEAD
                <div className="form-flex items-center">
                    <div className="form-left-section">

                        {/* Budget */}
                        <Box className='input-field lg:ml-4 mx-0'>
=======
                <div className="items-center form-flex">
                    <div className="form-left-section">

                        {/* Budget */}
                        <Box className='mx-0 input-field lg:ml-4'>
>>>>>>> fd3210359d6c143215aef639c14815d77d7d10c7
                            <InputLabel id="demo-simple-select-label" className='input-label'>External /Fund Internal / Budget*</InputLabel>
                            <Select
                                fullWidth

                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
<<<<<<< HEAD
                                value={values.fund_type}
                                name='fund_type'
=======
                                value={values.fundType}
                                name='fundType'
>>>>>>> fd3210359d6c143215aef639c14815d77d7d10c7
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
<<<<<<< HEAD
                        <Box className='input-field lg:ml-4 mx-0'>
=======
                        <Box className='mx-0 input-field lg:ml-4'>
>>>>>>> fd3210359d6c143215aef639c14815d77d7d10c7
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
<<<<<<< HEAD
                <div className="form-flex items-center">
=======
                <div className="items-center form-flex">
>>>>>>> fd3210359d6c143215aef639c14815d77d7d10c7
                    <div className="form-right-section">


                        {/* venue name */}
<<<<<<< HEAD
                        <Box className='input-field lg:ml-4 mx-0'>
=======
                        <Box className='mx-0 input-field lg:ml-4'>
>>>>>>> fd3210359d6c143215aef639c14815d77d7d10c7

                            <TextField
                                fullWidth required multiline id="outlined-multiline-flexible"
                                label="Venue Name"
                                variant="outlined"
                                type="search"
<<<<<<< HEAD
                                name='venue_name'
                                size="small"
                                onChange={onChange}
                                value={values.venue_name}
=======
                                name='venueName'
                                size="small"
                                onChange={onChange}
                                value={values.venueName}
>>>>>>> fd3210359d6c143215aef639c14815d77d7d10c7


                            />
                        </Box>
                    </div>
                    <div className="form-right-section">
                        {/* Venue type */}
<<<<<<< HEAD
                        <Box className='input-field lg:ml-4 mx-0'>
=======
                        <Box className='mx-0 input-field lg:ml-4'>
>>>>>>> fd3210359d6c143215aef639c14815d77d7d10c7
                            <InputLabel id="demo-simple-select-label" className='input-label'>Venue Type *</InputLabel>
                            <Select
                                fullWidth labelId="demo-simple-select-label"
                                id="demo-simple-select"
<<<<<<< HEAD
                                value={values.venue_type}
                                name='venue_type'
=======
                                value={values.venueType}
                                name='venueType'
>>>>>>> fd3210359d6c143215aef639c14815d77d7d10c7
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