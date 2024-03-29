import { green, red } from '@mui/material/colors';
import Fab from '@mui/material/Fab';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/system';
import { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import { BiCheck, BiSave, BiTrash } from 'react-icons/bi';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';

import { toast } from 'react-toastify';
import DesignationMasterService from '../../../../services/admin/DesignationMasterService';
import { RequestStatus } from '../../../../constant/requestStatus';
import { useDispatch } from 'react-redux';
import { editDesignation } from '../../../../feature/admin/DesignationSlice';

function DesignationAction({ params, rowId, setRowId, setDeleteId }: any) {
	const dispatch = useDispatch<any>();
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [deleteLoading, setDeleteLoadng] = useState(false);
	const [deleteConfirm, setDeleteConfirm] = useState(false);

	const { auth } = useAppSelector((state) => state.persistedReducer);

	useEffect(() => {
		if (rowId === params.id && success) {
			setSuccess(false);
		}
	}, [rowId]);

	const handleUpdate = async () => {
		setLoading(true);
		const { designationId, designationName, locationId } = params.row;

		const data = {
			designationId,
			designationName,
			locationId,
		};
		setTimeout(async () => {
			const token = auth?.user?.token;

			const result = await dispatch(editDesignation({ data, token }));

			setLoading(false);
		}, 1500);
	};
	const handleDelete = async () => {
		setDeleteLoadng(true);
		setDeleteConfirm(false);
		setTimeout(async () => {
			const { designationId, designationName } = params.row;
			const result = await DesignationMasterService.deleteDesignation(
				designationId,
				auth?.user?.token
			);
			console.log(result);
			if (result.data.status === RequestStatus.SUCCESS) {
				toast.error(`${designationName} is deleted`);
				setDeleteId(designationId);
			} else {
				toast.error(`${result.data.message}`);
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
									Do you want to delete Employee Designation named as{' '}
									<code className='px-2 bg-red-200 rounded-lg'>
										{' '}
										{params.row.designationId} - {params.row.designationName}
									</code>
									?
								</div>
								<p className='mt-1 text-sm leading-none text-gray-600'>
									By deleting this Employee Designation you will lose this
									employee type data
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

export default DesignationAction;
