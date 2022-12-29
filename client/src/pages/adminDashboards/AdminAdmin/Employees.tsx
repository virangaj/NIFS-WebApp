import React from 'react';
import AddEmployee from './shared/AddEmployee';

function Employees() {
	return (
		<>
			<h1 className="page-title">Employees</h1>
			<hr className="horizontal-line" />
      <AddEmployee/>
			<div className="admin-panel-flex"></div>
		</>
	);
}

export default Employees;
