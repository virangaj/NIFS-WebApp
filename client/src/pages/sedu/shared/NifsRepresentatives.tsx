import { HiOutlineTrash } from 'react-icons/hi';

import EventParticipantForm from './EventParticipantForm';

import '../../pages.css';
import { EventRepresentative } from '../../../constant/eventRepresentative';
import IRepresentativeMaster from '../../../types/sedu/IRepresentativeMaster';

function NifsRepresentatives({ total, setTotal }: any) {
	const handleDelete = (id: any) => {
		setTotal((prev: any) => prev.filter((i: any) => i.participantId !== id));
	};

	// console.log(total)

	return (
		<>
			<EventParticipantForm
				name='NIFS Representative'
				type={EventRepresentative.NIFS_REPRESENTATIVE}
				total={total}
				setTotal={setTotal}
			/>

			<table className='table table-zebra w-full'>
				<thead>
					<tr>
						<th>Name</th>
						<th>NIC No</th>
						<th>Contact No</th>
						<th>Address</th>
						<th>Email</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{total &&
						total
							.filter(
								(t: IRepresentativeMaster) =>
									t.participantType === EventRepresentative.NIFS_REPRESENTATIVE
							)
							.map((t: IRepresentativeMaster, index: number) => (
								<tr key={index}>
									<td>{t.name}</td>
									<td>{t.nic}</td>
									<td>{t.contactNo}</td>
									<td>{t.address}</td>
									<td>{t.email}</td>
									<td>
										<HiOutlineTrash
											className='text-xl cursor-pointer hover:text-red-500'
											onClick={() => handleDelete(t.participantId)}
										/>
									</td>
								</tr>
							))}
				</tbody>
			</table>
		</>
	);
}

export default NifsRepresentatives;
