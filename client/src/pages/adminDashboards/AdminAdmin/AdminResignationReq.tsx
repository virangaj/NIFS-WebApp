import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../hooks/hooks';
import ResignationService from '../../../services/admin/ResignationService';
import ResignationRequestTable from '../../shared/ResignationRequestTable';

function AdminResignationReq() {
	const { auth } = useAppSelector((state) => state.persistedReducer);
	const [requests, setRequests] = useState<any>([]);
	const [rowId, setRowId] = useState(0);
	const [selectedData, setSelectedData] = useState<Array<string>>([]);
	const [pageSize, setPageSize] = useState(10);
	const [loading, setLoading] = useState(false);

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

	const sendApprove = () => {};
	const sendReject = () => {};

	return (
		<>
			<div className='admin-page-title'>
				<p>Resignation Request</p>

				<hr className='admin-horizontal-line' />
			</div>

			<div className='admin-table-section'>
				<div className='flex justify-end mb-4'>
					<button
						className='action-com-model-error-btn'
						type='reset'
						color='error'
						onClick={sendReject}
					>
						Reject Selected
					</button>
					<button className='action-com-model-sucess-btn' onClick={sendApprove}>
						Approve Selected
					</button>
				</div>
				<ResignationRequestTable
					setSelectedData={setSelectedData}
					sendReject={sendReject}
					sendApprove={sendApprove}
				/>
			</div>
		</>
	);
}

export default AdminResignationReq;
