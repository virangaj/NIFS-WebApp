import React from 'react';
import AddEmployee from './shared/AddEmployee';

function Employees() {
	return (
		<>
			<div className='page-title'>
				<p>Employees</p>

				<hr className='admin-horizontal-line' />
			</div>
			<AddEmployee />
			<div className='admin-panel-flex'></div>
		</>
	);
}

export default Employees;
