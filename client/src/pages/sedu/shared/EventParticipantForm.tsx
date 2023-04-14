import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { HiPlus, HiX } from 'react-icons/hi';

import { generateID } from '../../../utils/generateId';

import '../../pages.css';
import IRepresentativeMaster from '../../../types/sedu/IRepresentativeMaster';

function EventParticipantForm({ type, total, setTotal, name }: any) {
	const [value, setValue] = useState<IRepresentativeMaster>({
		participantId: '',
		participantType: type,
		name: '',
		nic: '',
		contactNo: '',
		address: '',
		email: '',
	});

	const [p_id, setP_id] = useState<String | any>('');

	useEffect(() => {
		generateEventId();
		// console.log('trigger ' + p_id);
		setValue({
			...value,
			participantId: p_id,
			participantType: type,
		});
	}, [value.name]);

	const generateEventId = () => {
		setP_id(generateID('PM'));
	};

	const onChange = (e: any) => {
		setValue((preState: any) => ({
			...preState,
			[e.target.name]: e.target.value,
		}));
	};

	const handleAdd = () => {
		setValue({
			participantId: p_id,
			participantType: type,
			name: value?.name,
			nic: value?.nic,
			contactNo: value?.contactNo,
			address: value?.address,
			email: value?.email,
		});

		// console.log(value);
		if (value.name !== '') {
			setTotal((prev: any) => [...prev, value]);
			reset();
		} else {
			alert('Please Enter value to Add!');
		}
	};

	const reset = () => {
		setValue({
			participantId: '',
			participantType: type,
			name: '',
			nic: '',
			contactNo: '',
			address: '',
			email: '',
		});
	};

	// console.log(total)

	return (
		<>
			<h1 className='mb-6 text-lg font-semibold'>{name} Details</h1>
			<div className='flex flex-col items-center justify-between sm:flex-row'>
				{/* name */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-between w-[100%]'>
					<Box className='w-[250px] mb-4'>
						<input
							className='mr-4 tailwind-text-box'
							id='outlined-basic'
							placeholder='Name'
							type='search'
							name='name'
							onChange={onChange}
							value={value.name}
						/>
					</Box>

					{/* nic number */}
					<Box className='w-[250px] mb-4'>
						<input
							className='mr-4 tailwind-text-box'
							id='outlined-basic'
							placeholder='NIC'
							type='search'
							name='nic'
							onChange={onChange}
							value={value.nic}
						/>
					</Box>

					{/* contact number */}
					<Box className='w-[250px] mb-4'>
						<input
							className='mr-4 tailwind-text-box'
							id='outlined-basic'
							placeholder='Contact No'
							type='search'
							name='contactNo'
							onChange={onChange}
							value={value.contactNo}
						/>
					</Box>

					{/* address */}
					<Box className='w-[250px] mb-4'>
						<input
							className='mr-4 tailwind-text-box'
							id='outlined-basic'
							placeholder='Address'
							type='search'
							name='address'
							onChange={onChange}
							value={value.address}
						/>
					</Box>

					{/* email */}
					<Box className='w-[250px] mb-4'>
						<input
							className='mr-4 tailwind-text-box'
							id='outlined-basic'
							placeholder='Email'
							type='search'
							name='email'
							onChange={onChange}
							value={value.email}
						/>
					</Box>
				</div>

				<div className='flex items-center justify-between mb-4'>
					<Button className='mr-10'>
						{' '}
						<HiPlus className='text-3xl' onClick={handleAdd} />
					</Button>
					<Button color='error' className='ml-10'>
						{' '}
						<HiX className='text-3xl' onClick={reset} />
					</Button>
				</div>
			</div>
		</>
	);
}

export default EventParticipantForm;
