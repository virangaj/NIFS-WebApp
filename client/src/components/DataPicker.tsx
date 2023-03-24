import React, { useEffect, useState } from 'react';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';

function CustomeDataPicker({ date, setDate, title }: any) {
	const [value, setValue] = useState<Date | null>(null);

	const months: any = {
		JAN: 1,
		FEB: 2,
		MAR: 3,
		APR: 4,
		MAY: 5,
		JUN: 6,
		JUL: 7,
		AUG: 8,
		SEP: 9,
		OCT: 10,
		NOV: 11,
		DEC: 12,
	};

	useEffect(() => {
		let dateValue: any = value?.toString().split(' ');
		let month: number = months[dateValue ? dateValue[1].toUpperCase() : ''];
		let chooseDate: number = parseInt(dateValue ? dateValue[2] : '');
		let year: number = parseInt(dateValue ? dateValue[3] : '');

		let actualDate: string = chooseDate + '/' + month + '/' + year;

		setDate(actualDate);
	}, [value]);

	return (
		<div>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<DatePicker
					label={title}
					value={value}
					onChange={(newValue) => {
						setValue(newValue);
					}}
					renderInput={(params) => <TextField {...params} />}
				/>
			</LocalizationProvider>
		</div>
	);
}

export default CustomeDataPicker;
