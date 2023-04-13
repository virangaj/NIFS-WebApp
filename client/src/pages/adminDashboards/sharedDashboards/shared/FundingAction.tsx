import { green } from '@mui/material/colors';
import { Box } from '@mui/system';
import { useState, useEffect } from 'react';

import { useAppSelector } from '../../../../hooks/hooks';
import CircularLoading from '../../../../components/tableIcons/CircularLoading';
import SuccessButton from '../../../../components/tableIcons/SuccessButton';
import FundingSourceService from '../../../../services/common/FundingSourceService';
import { toast } from 'react-toastify';

function FundingAction({ params, rowId, setRowId, setDeleteId }: any) {
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
		const { fundingId, name, description } = params.row;
		setTimeout(async () => {
			const data = {
				data: {
					fundingId,
					name,
					description,
				},
				token: auth?.user?.token,
			};

			await FundingSourceService.updateFunding(data)
				.then((res) => {
					if (res) {
						toast.success('Funding Source updated!');
					} else {
						toast.error('Request cannotţbe completed!');
					}
				})
				.catch((e) => {
					console.log(e);
					toast.error('Request cannotţbe completed!');
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
		</>
	);
}

export default FundingAction;
