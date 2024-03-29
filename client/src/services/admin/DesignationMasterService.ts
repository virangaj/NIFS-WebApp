import axios from 'axios';

import http from '../../utils/http-common';

const config = {
	headers: {
		'Access-Control-Allow-Credentials': true,
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
		'Access-Control-Allow-Headers': 'application/json',
	},
};
axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER;

const getAllDesignations = async () => {
	// return http.get<any>('/admin/designation');
	const response = await axios({
		method: 'get',
		url: `${process.env.REACT_APP_BACKEND_SERVER}/admin/designation`,
	});
	// alert("Favourite created --- "+ response);
	return response;
};

const getDesignation = (id: any) => {
	return http.get<any>(`/admin/designation/get/${id}`);
};

const saveDesignation = async (data: any, token: string) => {
	const response = await axios({
		method: 'post',
		url: `${process.env.REACT_APP_BACKEND_SERVER}/admin/designation/add`,
		data: data,
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			Authorization: `Bearer ${token}`,
		},
	});
	// alert("Favourite created --- "+ response);
	return response;
};

//get new id
const getNewDesignationId = () => {
	return http.get('/admin/designation/newid');
};

//get employee designation by location id
const getDesignationByLocationId = (id: any) => {
	return http.get<any>(`/admin/designation/location/${id}`);
};

const editDesignation = async (favJSON: any, token: any) => {
	// console.log(favJSON);
	const response = await axios({
		method: 'patch',
		url: `${process.env.REACT_APP_BACKEND_SERVER}/admin/designation/update/${favJSON.designationId}`,
		data: favJSON,
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			Authorization: `Bearer ${token}`,
		},
	});
	console.log(response);
	// alert("Favourite created --- "+ response);
	return response;
};

const deleteDesignation = async (id: string, token: string) => {
	console.log(id);
	const response = await axios({
		method: 'delete',
		url: `${process.env.REACT_APP_BACKEND_SERVER}/admin/designation/delete/${id}`,
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			Authorization: `Bearer ${token}`,
		},
	});
	// alert("Favourite created --- "+ response);
	return response;
};

const DesignationMasterService = {
	getAllDesignations,
	getDesignation,
	saveDesignation,
	editDesignation,
	deleteDesignation,
	getNewDesignationId,
	getDesignationByLocationId,
};

export default DesignationMasterService;
