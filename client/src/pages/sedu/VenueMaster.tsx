import React, { useState } from 'react'

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import IVenueMaster from '../../types/VenueMaster';

import '../pages.css'
function VenueMaster() {

    const [values, setValues] = useState<IVenueMaster>({
        venue_id: "",
        name: "",
        type: "",
        availability: "",
        location: "",
        remarks: "",
        capacity: 0,
    });

    const onSubmit = async (e: any) => {
        e.preventDefault();
        console.log('function trigger')
    }


    return (
        <div className='sub-body-content'>
            <h1 className='page-title'>Venue Master</h1>

            <form onSubmit={onSubmit}>


                <div className="form-flex">
                    <div className="form-left-section">
                        <TextField id="outlined-basic" label="Outlined" variant="outlined" type="text" />
                    </div>
                    <div className="form-right-section">
                        <TextField id="outlined-basic" label="Outlined" variant="outlined" type="text" />
                    </div>
                </div>
                {/* button stack */}
                <Stack
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="flex-end"
                    spacing={2}
                >
                    <Button variant="contained" type='reset' color="error">Reset</Button>
                    <Button variant="contained" type='submit'>Submit</Button>

                </Stack>
            </form>

        </div>
    )
}

export default VenueMaster