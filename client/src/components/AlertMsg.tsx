import { toast } from 'react-toastify';
import { AlertTypes } from '../constant/alertTypes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function AlertMsg({ type, text }: any) {
	if (type === AlertTypes.SUCCESS) {
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
	} else if (type === AlertTypes.WARNING) {
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
	} else if (type === AlertTypes.ERROR) {
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
	} else if (type === AlertTypes.INFO) {
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
	return (
		<>
			<ToastContainer
				position='top-right'
				autoClose={5000}
				limit={1}
				hideProgressBar={false}
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='dark'
			/>
		</>
	);
}

export default AlertMsg;
