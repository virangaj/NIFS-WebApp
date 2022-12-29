import axios from 'axios';

import http from '../../http-common';

const config = {
	headers: {
		'Access-Control-Allow-Credentials': true,
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
		'Access-Control-Allow-Headers': 'application/json',
	},
};
axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER;

const getAllDesignations = () => {
	return http.get<Array<any>>('/admin/designation');
};

const getDesignation = (id: any) => {
	return http.get<any>(`/admin/designation/${id}`);
};

const saveDesignation = async (favJSON: any) => {
	console.log(favJSON);
	const response = await axios({
		method: 'post',
		url: `${process.env.REACT_APP_BACKEND_SERVER}/admin/designation`,
		data: favJSON,
		headers: { 'Content-Type': 'application/json; charset=utf-8' },
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

const editDesignation = async (favJSON: any) => {
	console.log(favJSON);
	// const response = await axios({
	// 	method: 'patch',
	// 	url: `${process.env.REACT_APP_BACKEND_SERVER}/admin/designation/${favJSON.typeId}`,
	// 	data: favJSON,
	// 	headers: { 'Content-Type': 'application/json; charset=utf-8' },

	// });

	const response = await axios.patch(
		process.env.REACT_APP_BACKEND_SERVER +
			'/admin/designation/' +
			favJSON.typeId,
		favJSON,
		config
	);

	// alert("Favourite created --- "+ response);
	return response;
};

const deleteDesignation = async (id: string) => {
	console.log(id);
	const response = await axios({
		method: 'delete',
		url: `${process.env.REACT_APP_BACKEND_SERVER}/admin/designation/delete/${id}`,
		headers: { 'Content-Type': 'application/json; charset=utf-8' },
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
