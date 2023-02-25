import Link from '@mui/material/Link';

function Copyright(props: any) {
	return (
		<p className='mt-10 text-sm text-center'>
			{'Copyright © '}
			<Link color='inherit' href='https://www.nifs.ac.lk/' target='_blank'>
				National Institute of Fundamental Studies
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</p>
	);
}

export default Copyright;
