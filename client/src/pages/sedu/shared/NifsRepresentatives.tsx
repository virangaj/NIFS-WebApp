import React, { useEffect, useState } from 'react'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { HiOutlineTrash } from "react-icons/hi";

import EventParticipantForm from './EventParticipantForm';


import '../../pages.css'



function NifsRepresentatives({ total, setTotal }: any) {


    const handleDelete = (id: any) => {
        setTotal((prev: any) => prev.filter((i: any) => i.id !== id))
    }


<<<<<<< HEAD
    console.log(total)
=======
    // console.log(total)
>>>>>>> fd3210359d6c143215aef639c14815d77d7d10c7

    return (
        <>
            <EventParticipantForm type="NIFS Representative" total={total} setTotal={setTotal} />

            <table>
                <tr>
                    <th>Name</th>
                    <th>NIC No</th>
                    <th>Contact No</th>
                    <th>Address</th>
                    <th>Email</th>
                    <th>Action</th>


                </tr>
                <tbody>
                    {total && total.filter((t: any) => t.p_type === "NIFS Representative").map((t: any, index: number) => (

                        <tr key={index}>
                            <td>{t.name}</td>
                            <td>{t.nic}</td>
                            <td>{t.contactNo}</td>
                            <td>{t.address}</td>
                            <td>{t.email}</td>
<<<<<<< HEAD
                            <td><HiOutlineTrash className='text-xl hover:text-red-500 cursor-pointer' onClick={() => handleDelete(t.id)} /></td>
=======
                            <td><HiOutlineTrash className='text-xl cursor-pointer hover:text-red-500' onClick={() => handleDelete(t.id)} /></td>
>>>>>>> fd3210359d6c143215aef639c14815d77d7d10c7

                        </tr>

                    ))}
                </tbody>



            </table>



        </>
    )
}

export default NifsRepresentatives
