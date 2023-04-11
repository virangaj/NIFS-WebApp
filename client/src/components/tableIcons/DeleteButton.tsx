import { Fab } from '@mui/material';
import { red } from '@mui/material/colors';
import React from 'react';
import { BiTrash } from 'react-icons/bi';

function DeleteButton({ setDeleteConfirm }: any) {
	return (
		<div>
			<Fab
				color='warning'
				sx={{
					width: 40,
					height: 40,
					bgcolor: red[500],
					'&:hover': { bgcolor: red[700] },
				}}
				className='cursor-pointer'
				onClick={() => {
					setDeleteConfirm((val: boolean) => !val);
				}}
			>
				<BiTrash className='text-xl text-white row-commit-icon' />
			</Fab>
		</div>
	);
}

export default DeleteButton;
