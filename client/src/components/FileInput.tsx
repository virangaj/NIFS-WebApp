import React, { useEffect, useState, useRef } from 'react'

import { Button } from '@mui/material';
import { HiX } from "react-icons/hi";

function FileInput({ setEventAttachment, eventAttachment, title }: File | any) {
    const attachment = useRef<HTMLInputElement>(null);

    const handleClickAttachment = (e: any) => {
        attachment.current?.click();
    };

    const handleFileChange = (event: any) => {
        const fileObj = event.target.files && event.target.files[0];
        console.log(fileObj)
        if (!fileObj) {
            return;
        }
        else {
            setEventAttachment(fileObj);

        }
        // reset file input
        event.target.value = null;
    };

    const options = {
        onUploadProgress: (progressEvent: any) => {
            const { loaded, total } = progressEvent;
            let percentage = Math.floor(loaded * 100 / total);
            console.log(` ${loaded}kb of ${total}kb`)
        }
    }



    return (
        <div className='flex items-center'>

            <input
                style={{ display: 'none' }}
                ref={attachment}
                type="file"
                onChange={handleFileChange}
                name='attachment'

            />

            <Button type='button' variant="outlined" onClick={handleClickAttachment} className='mr-10'>
                {title}
            </Button>
            {eventAttachment && eventAttachment ?
                <>
                    <p className='mx-6'>{eventAttachment.name}</p>
                    <HiX className='text-xl hover:text-red-600 cursor-pointer' onClick={() => setEventAttachment(null)} />
                </> : ''}

        </div>
    )
}

export default FileInput
