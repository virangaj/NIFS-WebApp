import React from 'react';

function InputFileds({ onChange, value, name, label }: any) {
	return (
		<div>
			<label className='input-label' htmlFor={name}>
				{label}
			</label>
			<input
				id='outlined-basic'
				type='search'
				className='tailwind-text-box'
				value={value}
				name={name}
				onChange={onChange}
			/>
		</div>
	);
}

export default InputFileds;
