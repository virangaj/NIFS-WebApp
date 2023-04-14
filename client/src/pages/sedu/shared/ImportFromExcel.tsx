import { useState } from 'react';
import ImportFromXlsx from '../../../components/ImportFromXlsx';
import { useNavigate } from 'react-router-dom';
import { HiArrowSmLeft } from 'react-icons/hi';
import EventSelector from '../../../components/shared/EventSelector';
import { useAppSelector } from '../../../hooks/hooks';
import ParticipantMasterService from '../../../services/sedu/ParticipantMasterService';
import { toast } from 'react-toastify';

function ImportFromExcel() {
	const naivate = useNavigate();
	const [colDefs, setColDefs] = useState<any>();
	const [data, setData] = useState<any[]>();
	const [loading, setLoading] = useState(false);

	const { auth } = useAppSelector((state) => state.persistedReducer);

	const [values, setValues] = useState<any>({
		eventId: '',
	});
	const onChange = (e: any) => {
		setValues((preState: any) => ({
			...preState,
			[e.target.name]: e.target.value,
		}));
	};
	const resetForm = () => {
		setValues({ eventId: '' });
		setData([]);
		setColDefs([]);
	};
	const sendBulkData = async (e: any) => {
		e.preventDefault();
		const bulkData = {
			eventId: values.eventId,
			participants: data,
		};
		setLoading(true);
		if (data != null && colDefs != null) {
			await ParticipantMasterService.sendBulkOfData(bulkData, auth?.user?.token)
				.then((res) => {
					if (res.data) {
						toast.success('Participants Added!');
						resetForm();
					}
				})
				.catch((e: any) => {
					toast.error('Requset cannot be Completed!');
				});
		} else {
			toast.warning('Please Select appropriate File!');
		}

		setLoading(false);
	};
	return (
		<div className='sub-body-content xl:!w-[90%] overflow-hidden'>
			<div className='flex items-center justify-between'>
				<div
					className='bg-gray-700 rounded-full p-1 mr-5 cursor-pointer'
					onClick={() => naivate(-1)}
				>
					<HiArrowSmLeft className='h-10 w-10 text-white' />
				</div>

				<ImportFromXlsx
					setColDefs={setColDefs}
					data={data}
					colDefs={colDefs}
					setData={setData}
				/>
				<EventSelector
					onChange={onChange}
					name='eventId'
					value={values.eventId}
				/>

				<button className='action-com-model-sucess-btn' onClick={sendBulkData}>
					Upload Data
				</button>
			</div>

			<table className='table table-zebra w-full'>
				<thead>
					<tr>
						{colDefs?.map((c: any, i: number) => (
							<th key={i}>{c.title}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data &&
						data.map((t: any, index: number) => (
							<tr key={index}>
								<td>{t.name}</td>
								<td>{t.nic}</td>
								<td>{t.gender}</td>
								<td>{t.address}</td>
								<td>{t.contactNo}</td>
								<td>{t.email}</td>
								<td>{t.institute}</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
}

export default ImportFromExcel;
