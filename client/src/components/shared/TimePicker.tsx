import React, { useEffect, useState } from 'react'


import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
// import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
// import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';

function CustomeTimePicker({ time, setTime, title }: any) {
    const [value, setValue] = useState<Date | null>(null);



    useEffect(() => {
        let timeValue: any = value?.toString().split(' ')[4];
        setTime(timeValue)
        console.log(timeValue)

    }, [value])
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>


            <TimePicker
                value={value}
                onChange={setValue}
                label={title}
                renderInput={(params) => <TextField {...params} />}
            />

        </LocalizationProvider>
    )
}

export default CustomeTimePicker
