import axios from 'axios';

import http from '../../utils/http-common';
import { RequestStatus } from '../../constant/requestStatus';

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER;

const getAllResignationRequest = async (token: any) => {
	// console.log(token);
	const response = await axios({
		method: 'get',
		url: `${process.env.REACT_APP_BACKEND_SERVER}/admin/resignation`,
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			Authorization: `Bearer ${token}`,
		},
	});
	// alert("Favourite created --- "+ response);
	return response;
};
const getDivisionResignationRequest = async (token: any, division: string) => {
	// console.log(token);
	const response = await axios({
		method: 'get',
		url: `${process.env.REACT_APP_BACKEND_SERVER}/admin/resignation?division=${division}`,
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			Authorization: `Bearer ${token}`,
		},
	});
	// alert("Favourite created --- "+ response);
	return response;
};

const getResignationRequest = (id: any) => {
	return http.get<any>(`/admin/resignation/get/${id}`);
};

const saveResignationRequest = async (data: any, token: string) => {
	console.log(token);
	const response = await axios({
		method: 'post',
		url: `${process.env.REACT_APP_BACKEND_SERVER}/admin/resignation`,
		data: data,
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			Authorization: `Bearer ${token}`,
		},
	});
	// alert("Favourite created --- "+ response);
	return response;
};

const sendHodApproval = async (
	id: any,
	token: string,
	approval: RequestStatus
) => {
	const response = await axios({
		method: 'put',
		url: `${process.env.REACT_APP_BACKEND_SERVER}/admin/resignation/hod/status?approval=${approval}`,
		data: id,
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			Authorization: `Bearer ${token}`,
		},
	});

	return response;
};

const sendDirApproval = async (
	id: any,
	token: string,
	approval: RequestStatus
) => {
	const response = await axios({
		method: 'put',
		url: `${process.env.REACT_APP_BACKEND_SERVER}/admin/resignation/director/status?approval=${approval}`,
		data: id,
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			Authorization: `Bearer ${token}`,
		},
	});

	return response;
};

const ResignationService = {
	getAllResignationRequest,
	getResignationRequest,
	getDivisionResignationRequest,
	saveResignationRequest,
	sendHodApproval,
	sendDirApproval,
};

export default ResignationService;
