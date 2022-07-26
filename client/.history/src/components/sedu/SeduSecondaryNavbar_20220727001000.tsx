import { Box } from '@mui/material'
import React from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { FaArtstation, FaApple, FaAppStoreIos } from "react-icons/fa";
function SeduSecondaryNavbar() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <Box sx={{ width: '90%' }} className="secondary-navbar">
            <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example">
                <div>
                    <h1 className="nav-section">title</h1>
                    <div>

                        <Tab icon={<FaArtstation />} label="Venue Master" />
                        <Tab icon={<FaApple />} label="Participant Master" />
                    </div>
                </div>

            </Tabs>

        </Box>
    )
}

export default SeduSecondaryNavbar