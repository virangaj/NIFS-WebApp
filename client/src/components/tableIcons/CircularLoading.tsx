import { CircularProgress } from '@mui/material';
import { green } from '@mui/material/colors';
import React from 'react';

function CircularLoading({ color }: any) {
	return (
		<>
			<CircularProgress
				size={52}
				sx={{
					color: { color },
					position: 'absolute',
					top: -6,
					left: -6,
					zIndex: 1,
				}}
			/>
		</>
	);
}

export default CircularLoading;
