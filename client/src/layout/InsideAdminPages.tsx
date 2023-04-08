import { Box } from '@mui/material';
import React from 'react';

function InsideAdminPages({
	Form,
	formHeading,
	tableHeading,
	title,
	Table,
}: any) {
	return (
		<>
			<div className='admin-page-title'>
				<p>{title}</p>

				<hr className='admin-horizontal-line' />
			</div>

			<div className='admin-panel-flex'>
				<div className='admin-table-section'>
					<h2 className='text-lg font-bold'>{tableHeading}</h2>
					<p className='hint-text'>(Double click to edit)</p>
					<Box sx={{ width: '1000px', height: '700px' }}>
						<Table />
					</Box>
				</div>

				{/* add new Designations */}
				<div className='admin-form-section'>
					<h2 className='text-lg font-bold'>{formHeading}</h2>

					<Form />
				</div>
			</div>
		</>
	);
}

export default InsideAdminPages;
