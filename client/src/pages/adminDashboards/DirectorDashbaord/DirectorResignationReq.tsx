import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../hooks/hooks';
import ResignationService from '../../../services/admin/ResignationService';
import ResignationRequestTable from '../../shared/ResignationRequestTable';
import { toast } from 'react-toastify';

function DirectorResignationReq() {
	const { auth } = useAppSelector((state) => state.persistedReducer);
	const [requests, setRequests] = useState<any>([]);
	const [rowId, setRowId] = useState(0);
	const [selectedData, setSelectedData] = useState<Array<string>>([]);
	const [pageSize, setPageSize] = useState(10);
	const [loading, setLoading] = useState(false);
	const [getData, setGetData] = useState(false);

	useEffect(() => {
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
	}, []);

	//send approval request
	const sendApprove = () => {
		console.log(selectedData);
		setLoading(true);
		setTimeout(() => {
			ResignationService.sendDirApproval(selectedData, auth?.user?.token, true)
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
			setLoading(false);
			setGetData((val) => !val);
		}, 500);
	};
	//send reject request
	const sendReject = () => {
		setLoading(true);
		setTimeout(() => {
			ResignationService.sendDirApproval(selectedData, auth?.user?.token, false)
				.then((res) => {
					if (res.data) {
						toast.success('Resignation is Declined');
					} else {
						toast.error('Request cannot be performed');
					}
				})
				.catch((e) => {
					console.log(e);
					toast.error('Request cannot be performed');
				});
			setGetData((val) => !val);
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
					getData={getData}
				/>
			</div>
		</>
	);
}

export default DirectorResignationReq;
