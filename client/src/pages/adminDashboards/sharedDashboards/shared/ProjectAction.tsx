import { green, red } from '@mui/material/colors';
import Fab from '@mui/material/Fab';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/system';
import { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import { BiCheck, BiSave, BiTrash } from 'react-icons/bi';
import { useAppSelector } from '../../../../hooks/hooks';
import { useDispatch } from 'react-redux';
import CircularLoading from '../../../../components/tableIcons/CircularLoading';
import DeleteButton from '../../../../components/tableIcons/DeleteButton';
import SuccessButton from '../../../../components/tableIcons/SuccessButton';
import ProjectService from '../../../../services/common/ProjectService';

function TableAction({ params, rowId, setRowId, setDeleteId }: any) {
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

	const handleDelete = async () => {};
	const handleUpdate = async () => {
		setLoading(true);
		const { projectId, projectName, description } = params.row;
		setTimeout(async () => {
			const data = {
				data: {
					projectId,
					projectName,
					description,
				},
				token: auth?.user?.token,
			};

			await ProjectService.updateProject(data)
				.then((res) => {
					console.log(res);
				})
				.catch((e) => {
					console.log(e);
				});

			setLoading(false);
		}, 1500);
	};
	return (
		<>
			<Box
				sx={{
					m: 1,
					position: 'relative',
				}}
			>
				<SuccessButton {...{ success, handleUpdate, params, loading, rowId }} />

				{loading && <CircularLoading color={green[500]} />}
			</Box>

			{/* delete */}

			<Box
				sx={{
					m: 1,
					position: 'relative',
				}}
			>
				<DeleteButton setDeleteConfirm={setDeleteConfirm} />

				{deleteLoading && <CircularLoading color={red[500]} />}
			</Box>
		</>
	);
}

export default TableAction;
