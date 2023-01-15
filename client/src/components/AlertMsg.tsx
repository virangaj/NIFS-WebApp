import { toast } from 'react-toastify';
import { AlertTypes } from '../constant/alertTypes';

function AlertMsg({ type, text }: any) {
	if (type === AlertTypes.success) {
		console.log(type);
		toast.success(`${text}`, {
			position: 'top-right',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'dark',
		});
	} else if (type === AlertTypes.warning) {
		console.log(type);

		toast.warning(`${text}`, {
			position: 'top-right',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'dark',
		});
	} else if (type === AlertTypes.error) {
		console.log(type);

		toast.error(`${text}`, {
			position: 'top-right',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'dark',
		});
	} else if (type === AlertTypes.info) {
		console.log(type);

		toast.info(`${text}`, {
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
	return <></>;
}

export default AlertMsg;
