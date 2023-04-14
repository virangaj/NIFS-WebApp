import axios from 'axios';

import http from '../../utils/http-common';
import IParticipantMaster from '../../types/sedu/IParticipantMaster';

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER;

const getAllParticipants = () => {
	return http.get<Array<any>>('/sedu/participants');
};

const getParticipant = (id: any) => {
	return http.get<IParticipantMaster>(`/sedu/participants/${id}`);
};

const saveParticipant = async (data: any, token: string) => {
	console.log(data);
	const response = await axios({
		method: 'post',
		url: `${process.env.REACT_APP_BACKEND_SERVER}/sedu/participants/add-single`,
		data: data,
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			Authorization: `Bearer ${token}`,
		},
	});
	// alert("Favourite created --- "+ response);
	return response;
};

const sendBulkOfData = async (data: any, token: string) => {
	console.log(data);
	const response = await axios({
		method: 'post',
		url: `${process.env.REACT_APP_BACKEND_SERVER}/sedu/participants/add-bulk`,
		data: data,
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			Authorization: `Bearer ${token}`,
		},
	});
	// alert("Favourite created --- "+ response);
	return response;
};

const ParticipantMasterService = {
	getAllParticipants,
	getParticipant,
	saveParticipant,
	sendBulkOfData,
};

export default ParticipantMasterService;
