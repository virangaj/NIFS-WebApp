import { green, red } from '@mui/material/colors';
import Fab from '@mui/material/Fab';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/system';
import { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import { BiCheck, BiSave, BiTrash } from 'react-icons/bi';
import EmployeeTypeService from '../../../../services/admin/EmployeeTypeService';
import { type } from '@testing-library/user-event/dist/type';

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'black',
	border: '2px solid #000',
	borderRadius: '10px',
	boxShadow: 24,
	p: 4,
};

function EmpTypeAction({ params, rowId, setRowId }: any) {
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [deleteLoading, setDeleteLoadng] = useState(false);
	const [deleteConfirm, setDeleteConfirm] = useState(false);

	useEffect(() => {
		if (rowId === params.id && success) {
			setSuccess(false);
		}
	}, [rowId]);

	//update emp type
	const handleUpdate = async () => {
		setLoading(true);
		const { typeId, typeName, location } = params.row;
		setTimeout(async () => {
			const result = await EmployeeTypeService.editEmpType({
				typeId,
				typeName,
				location,
			});
			if (result) {
				setSuccess(true);
				setRowId(null);
			}
			console.log(typeId);
			setLoading(false);
		}, 1500);
	};

	//delete emp type
	const handleDelete = async () => {
		setDeleteLoadng(true);
		setDeleteConfirm(false);

		const { typeId } = params.row;
		const result = await EmployeeTypeService.deleteEmpType(typeId);
		console.log('deleted ' + typeId);
		setDeleteLoadng(false);
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
						color="primary"
						sx={{
							width: 40,
							height: 40,
							bgcolor: green[500],
							'&:hover': { bgcolor: green[700] },
						}}
						className="cursor-pointer"
					>
						<BiCheck className="text-xl text-white row-commit-icon" />
					</Fab>
				) : (
					<Fab
						color="primary"
						sx={{
							width: 40,
							height: 40,
						}}
						disabled={params.id !== rowId || loading}
						onClick={handleUpdate}
					>
						<BiSave className="row-commit-icon" />
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
					color="warning"
					sx={{
						width: 40,
						height: 40,
						bgcolor: red[500],
						'&:hover': { bgcolor: red[700] },
					}}
					className="cursor-pointer"
					onClick={() => {
						setDeleteConfirm((val) => !val);
					}}
				>
					<BiTrash className="text-xl text-white row-commit-icon" />
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
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<h3 className="flex flex-col text-lg font-bold text-center text-red-400">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="w-48 mx-auto icon icon-tabler icon-tabler-alert-circle stroke-error"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path
								stroke="none"
								d="M0 0h24v24H0z"
								fill="none"
							></path>
							<circle
								cx="12"
								cy="12"
								r="9"
							></circle>
							<line
								x1="12"
								y1="8"
								x2="12"
								y2="12"
							></line>
							<line
								x1="12"
								y1="16"
								x2="12.01"
								y2="16"
							></line>
						</svg>
						<span className="text-white">Are you sure?</span>
					</h3>
					<p className="py-4 text-base text-white">
						Do you really want to delete this Employee Type? Once you delete
						data is no longer saved in our database.
					</p>
					<code className="text-white">{/* [{params.typeName}] */}</code>

					<button
						className="delete-confirm-btn"
						onClick={handleDelete}
					>
						Confirm
					</button>
				</Box>
			</Modal>
		</>
	);
}

export default EmpTypeAction;
