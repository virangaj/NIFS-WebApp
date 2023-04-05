import axios from 'axios';

import http from '../../utils/http-common';

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER;

const getAllResignationRequest = () => {
	return http.get<any>('/admin/resignation');
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

const ResignationService = {
	getAllResignationRequest,
	getResignationRequest,
	saveResignationRequest,
};

export default ResignationService;
