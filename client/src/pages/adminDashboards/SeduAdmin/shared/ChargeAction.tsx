import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../hooks/hooks';
import { Box, Fab, Modal } from '@mui/material';
import { green, red } from '@mui/material/colors';
import CircularProgress from '@mui/material/CircularProgress';
import { BiCheck, BiSave, BiTrash } from 'react-icons/bi';
import { toast } from 'react-toastify';
import VenueOtherService from '../../../../services/sedu/VenueOtherService';
import { RequestStatus } from '../../../../constant/requestStatus';

function ChargeAction({ params, rowId, setRowId, setDeleteId }: any) {
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
		const { chargeId, name, charge } = params.row;
		const data = {
			chargeId,
			name,
			charge,
		};

		setTimeout(async () => {
			const token = auth?.user?.token;

			VenueOtherService.updateCharge(data, token)
				.then((res) => {
					if ((res.status = RequestStatus.SUCCESS)) {
						toast.success('Charge has been updated!');
					} else {
						toast.error('Request cannot be completed');
					}
				})
				.catch((e) => {
					toast.error('Request cannot be completed');
				});

			setLoading(false);
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
		</>
	);
}

export default ChargeAction;
