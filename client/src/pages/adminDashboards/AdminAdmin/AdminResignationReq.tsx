import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../hooks/hooks';
import ResignationService from '../../../services/admin/ResignationService';
import ResignationRequestTable from '../../shared/ResignationRequestTable';
import { toast } from 'react-toastify';
import { RequestStatus } from '../../../constant/requestStatus';

function AdminResignationReq() {
	const { auth } = useAppSelector((state) => state.persistedReducer);
	const [requests, setRequests] = useState<any>([]);
	const [selectedData, setSelectedData] = useState<Array<string>>([]);
	const [loading, setLoading] = useState(false);
	const [getData, setGetData] = useState(false);

	useEffect(() => {
		retriveData();
	}, []);

	const retriveData = () => {
		setLoading(true);
		setTimeout(() => {
			ResignationService.getAllResignationRequest(auth?.user?.token)
				.then((res) => {
					setRequests(res.data);
				})
				.then((e) => {
					console.log(e);
				});
			setLoading(false);
		}, 500);
	};

	//send approval request
	const sendApprove = () => {
		console.log(selectedData);
		setLoading(true);
		setTimeout(() => {
			ResignationService.sendHodApproval(
				selectedData,
				auth?.user?.token,
				RequestStatus.APPROVED
			)
				.then((res) => {
					if (res.data) {
						toast.success('Resignation is Confirmed');
					} else {
						toast.error('Request cannot be performed');
					}
				})
				.catch((e) => {
					console.log(e);
					toast.error('Request cannot be performed');
				});
			retriveData();
			setGetData((val) => !val);
		}, 500);
	};
	//send reject request
	const sendReject = () => {
		setLoading(true);
		setTimeout(() => {
			ResignationService.sendHodApproval(
				selectedData,
				auth?.user?.token,
				RequestStatus.DISAPPROVED
			)
				.then((res) => {
					if (res.data) {
						toast.warning('Resignation is Declined');
					} else {
						toast.error('Request cannot be performed');
					}
				})
				.catch((e) => {
					console.log(e);
					toast.error('Request cannot be performed');
				});
			retriveData();
			setLoading(false);
		}, 500);
	};

	return (
		<>
			<div className='admin-page-title'>
				<p>Resignation Request</p>

				<hr className='admin-horizontal-line' />
			</div>

			<div className='admin-table-section'>
				<div className='flex justify-end mb-4'>
					<button className='action-com-model-sucess-btn' onClick={sendApprove}>
						Approve Selected
					</button>
					<button
						className='action-com-model-error-btn'
						type='reset'
						color='error'
						onClick={sendReject}
					>
						Reject Selected
					</button>
				</div>
				<ResignationRequestTable
					setSelectedData={setSelectedData}
					requests={requests}
					loading={loading}
				/>
			</div>
		</>
	);
}

export default AdminResignationReq;
