import { Fab } from '@mui/material';
import { green } from '@mui/material/colors';
import React from 'react';
import { BiCheck, BiSave, BiTrash } from 'react-icons/bi';
function SuccessButton({ success, handleUpdate, params, loading, rowId }: any) {
	return (
		<>
			{success ? (
				<Fab
					color='primary'
					sx={{
						width: 40,
						height: 40,
						bgcolor: green[500],
						'&:hover': { bgcolor: green[700] },
					}}
					className='cursor-pointer'
				>
					<BiCheck className='text-xl text-white row-commit-icon' />
				</Fab>
			) : (
				<Fab
					color='primary'
					sx={{
						width: 40,
						height: 40,
					}}
					disabled={params.id !== rowId || loading}
					onClick={handleUpdate}
				>
					<BiSave className='row-commit-icon' />
				</Fab>
			)}
		</>
	);
}

export default SuccessButton;
