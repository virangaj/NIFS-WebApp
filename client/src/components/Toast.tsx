import React, { useEffect } from 'react'

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


function Toast(type: any, message: string) {

    useEffect(() => {

        if (type === 'success') {
            toast.success(message)
        }
        else if (type === 'error') {
            toast.error(message)
        }

    }, [message, type])

    return (
        <div>
            <ToastContainer

            />
        </div>
    )
}

export default Toast
