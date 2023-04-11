import React from 'react';
import { RequestStatus } from '../../constant/requestStatus';
import { HiCheck, HiX, HiOutlineRefresh } from 'react-icons/hi';
function RequestStatusView({ status }: any) {
	return (
		<>
			<div
				className={`w-full h-full flex items-center justify-center font-bold ${
					status === RequestStatus.PENDING
						? 'text-orange-400'
						: status === RequestStatus.APPROVED
						? 'text-green-400'
						: 'text-red-400'
				}`}
			>
				{status === RequestStatus.PENDING ? (
					<HiOutlineRefresh className='w-4 h-4 mr-2' />
				) : status === RequestStatus.APPROVED ? (
					<HiCheck className='w-4 h-4 mr-2' />
				) : (
					<HiX className='w-4 h-4 mr-2' />
				)}
				{status}
			</div>
		</>
	);
}

export default RequestStatusView;
