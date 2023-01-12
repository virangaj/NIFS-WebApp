import React from 'react';
import AddEmployee from './shared/AddEmployee';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { HiOutlineUserAdd, HiOutlineUserGroup } from 'react-icons/hi';
import AllEmployees from './shared/AllEmployees';
function Employees() {
	const [value, setValue] = React.useState('1');

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};

	return (
		<>
			<div className='admin-page-title'>
				<p>Employees</p>

				<hr className='admin-horizontal-line' />
			</div>
			<div className='admin-tab-menu'>
				<Box sx={{ width: '100%', typography: 'body1' }}>
					<TabContext value={value}>
						<TabList
							centered
							onChange={handleChange}
							aria-label='lab API tabs example'
						>
							<Tab
								icon={<HiOutlineUserAdd className='text-2xl' />}
								label='Add Employee'
								value='1'
							/>
							<Tab
								icon={<HiOutlineUserGroup className='text-2xl' />}
								label='View All Employees'
								value='2'
							/>
						</TabList>

						<TabPanel value='1'>
							<AddEmployee />
						</TabPanel>
						<TabPanel value='2'>
							<AllEmployees />
						</TabPanel>
					</TabContext>
				</Box>
			</div>
		</>
	);
}

export default Employees;
