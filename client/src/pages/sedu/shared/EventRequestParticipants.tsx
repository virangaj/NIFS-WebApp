import React from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Box from '@mui/material/Box';
import LectureDetails from './LectureDetails';
import EventReqParticipants from './EventReqParticipants';
import NifsRepresentatives from './NifsRepresentatives';

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<>{children}</>
				</Box>
			)}
		</div>
	);
}

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}
function EventRequestParticipants({ total, setTotal }: any) {
	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};
	return (
		<Box sx={{ width: '100%', marginY: '20px', overflowX: 'scroll' }}>
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Tabs
					value={value}
					onChange={handleChange}
					scrollButtons
					variant='scrollable'
					allowScrollButtonsMobile
				>
					<Tab label='Nifs Representatives' {...a11yProps(0)} />
					<Tab label='Participants' {...a11yProps(1)} />
					<Tab label='Lecture Details' {...a11yProps(2)} />
				</Tabs>
			</Box>
			<TabPanel value={value} index={0}>
				<NifsRepresentatives total={total} setTotal={setTotal} />
			</TabPanel>
			<TabPanel value={value} index={1}>
				<EventReqParticipants total={total} setTotal={setTotal} />
			</TabPanel>
			<TabPanel value={value} index={2}>
				<LectureDetails total={total} setTotal={setTotal} />
			</TabPanel>
		</Box>
	);
}

export default EventRequestParticipants;
