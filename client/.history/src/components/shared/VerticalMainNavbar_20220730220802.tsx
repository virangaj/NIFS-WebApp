import React from 'react'
import data from '../data/MainNavPages.json'



function VerticalMainNavbar() {
    console.log(data)

    return (
        <div className='fixed left-0 top-0'>
            <div className='bg-red-400 h-[100vh] w-24'>
                <h1>Home Page</h1>
                <h1>Home Page</h1>
                <h1>Home Page</h1>
                <h1>Home Page</h1>
                <h1>Home Page</h1>
            </div>
        </div>
    )
}

export default VerticalMainNavbar