import React, { useState } from 'react';
import IInsuranceClaim from '../../types/admin/IInsuranceClaim';

const initialState: IInsuranceClaim = {
	documentNo: '',
	date: '',
	employee: '',
	insuranceCompany: '',
	remark: '',
	attachment: '',
	insuranceType: '',
	policyNo: '',
	claimAmount: '',
};

function InsuranceClaim() {
	const [values, setValues] = useState<IInsuranceClaim>(initialState);
	//onsubmit
	const onSubmit = async (e: any) => {
		e.preventDefault();
		console.log(values);
	};
	return (
		<div className='sub-body-content xl:!w-[60%]'>
			<h1 className='page-title'>Insurance Details</h1>
			<hr className='horizontal-line' />
			<form onSubmit={onSubmit}></form>
		</div>
	);
}

export default InsuranceClaim;
