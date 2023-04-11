import { green } from '@mui/material/colors';
import { Box } from '@mui/system';
import { useState, useEffect } from 'react';

import { useAppSelector } from '../../../../hooks/hooks';
import CircularLoading from '../../../../components/tableIcons/CircularLoading';
import SuccessButton from '../../../../components/tableIcons/SuccessButton';
import ProjectService from '../../../../services/common/ProjectService';

function TableAction({ params, rowId, setRowId, setDeleteId }: any) {
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	const { auth } = useAppSelector((state) => state.persistedReducer);

	useEffect(() => {
		if (rowId === params.id && success) {
			setSuccess(false);
		}
	}, [rowId]);

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
		</>
	);
}

export default TableAction;
