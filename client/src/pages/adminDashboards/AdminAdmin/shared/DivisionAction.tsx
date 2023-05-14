import { green, red } from '@mui/material/colors';
import Fab from '@mui/material/Fab';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/system';
import { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import { BiCheck, BiSave, BiTrash } from 'react-icons/bi';

import { toast } from 'react-toastify';
import DivisionMasterService from '../../../../services/admin/DivisionMasterService';
import { RequestStatus } from '../../../../constant/requestStatus';

function DivisionAction({ params, rowId, setRowId, setDeleteId }: any) {
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [deleteLoading, setDeleteLoadng] = useState(false);
	const [deleteConfirm, setDeleteConfirm] = useState(false);
	useEffect(() => {
		if (rowId === params.id && success) {
			setSuccess(false);
		}
	}, [rowId]);

	const handleUpdate = async () => {
		setLoading(true);
		const { divisionId, name, locationId } = params.row;
		setTimeout(async () => {
			const result = await DivisionMasterService.editDivision({
				divisionId,
				name,
				locationId,
			});
			if (result.data.status === RequestStatus.SUCCESS) {
				setSuccess(true);
				setRowId(null);
				toast.success(`Division updated to ${name}`, {
					position: 'top-right',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'dark',
				});
			} else {
				setSuccess(false);
				setRowId(null);
				toast.error(`${result.data.message}`, {
					position: 'top-right',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'dark',
				});
			}
			// console.log(typeId);
			setLoading(false);
		}, 1500);
	};

	const handleDelete = async () => {
		setDeleteLoadng(true);
		setDeleteConfirm(false);
		setTimeout(async () => {
			const { divisionId, name } = params.row;
			const result = await DivisionMasterService.deleteDivision(divisionId);
			// console.log('deleted ' + typeId);
			if (result.data.status === RequestStatus.SUCCESS) {
				toast.error(`${name} is deleted`, {
					position: 'top-right',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'dark',
				});
				setDeleteId(divisionId);
			} else {
				toast.error(`${result.data.message}`, {
					position: 'top-right',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'dark',
				});
			}

			setDeleteLoadng(false);
		}, 1500);
	};

	return (
		<>
			{/* update */}

			<Box
				sx={{
					m: 1,
					position: 'relative',
				}}
			>
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

				{loading && (
					<CircularProgress
						size={52}
						sx={{
							color: green[500],
							position: 'absolute',
							top: -6,
							left: -6,
							zIndex: 1,
						}}
					/>
				)}
			</Box>

			{/* delete */}

			<Box
				sx={{
					m: 1,
					position: 'relative',
				}}
			>
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
						setDeleteConfirm((val) => !val);
					}}
				>
					<BiTrash className='text-xl text-white row-commit-icon' />
				</Fab>

				{deleteLoading && (
					<CircularProgress
						size={52}
						sx={{
							color: red[500],
							position: 'absolute',
							top: -6,
							left: -6,
							zIndex: 1,
						}}
					/>
				)}
			</Box>

			<Modal
				open={deleteConfirm}
				onClose={() => {
					setDeleteConfirm((val) => !val);
				}}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<div className='action-com-model'>
					<div className='flex flex-col items-center justify-between lg:flex-row'>
						<div className='flex flex-col items-center lg:flex-row'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='w-16 h-16 p-3 mb-4 text-red-400 border border-red-100 rounded-2xl bg-red-50 lg:mb-0'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
								></path>
							</svg>
							<div className='flex flex-col ml-3'>
								<div className='mb-2 font-medium leading-none'>
									Do you want to delete Division named as{' '}
									<code className='px-2 bg-red-200 rounded-lg'>
										{' '}
										{params.row.divisionId} - {params.row.name}
									</code>
									?
								</div>
								<p className='mt-1 text-sm leading-none text-gray-600'>
									By deleting this Division you will lose this division data
								</p>
							</div>
						</div>
						<div className='mt-4 lg:mt-0'>
							<button
								className='action-com-model-sucess-btn'
								onClick={() => {
									setDeleteConfirm((val) => !val);
								}}
							>
								Cancel
							</button>
							<button
								className='action-com-model-error-btn'
								onClick={handleDelete}
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			</Modal>
		</>
	);
}

export default DivisionAction;
