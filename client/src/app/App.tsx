import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AppRouter from '../router/Router';
function App() {
	return (
		<div className='flex flex-col mx-auto'>
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
				theme='light'
			/>

			<AppRouter />
		</div>
	);
}

export default App;
