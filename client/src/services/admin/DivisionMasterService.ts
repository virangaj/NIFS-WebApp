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

const getAllDivisions = () => {
	return http.get<Array<any>>('/admin/divisionmaster');
};

const getDivision = (id: any) => {
	return http.get<any>(`/admin/divisionmaster/${id}`);
};

const saveDivision = async (favJSON: any) => {
	console.log(favJSON);
	const response = await axios({
		method: 'post',
		url: `${process.env.REACT_APP_BACKEND_SERVER}/admin/divisionmaster`,
		data: favJSON,
		headers: { 'Content-Type': 'application/json; charset=utf-8' },
	});
	// alert("Favourite created --- "+ response);
	return response;
};

//get new id
const getNewDivisionId = () => {
	return http.get('/admin/divisionmaster/newid');
};

//get employee cat by location id
const getDivisionByLocationId = (id: any) => {
	return http.get<any>(`/admin/divisionmaster/location/${id}`);
};

const editDivision = async (favJSON: any) => {
	console.log(favJSON);
	// const response = await axios({
	// 	method: 'patch',
	// 	url: `${process.env.REACT_APP_BACKEND_SERVER}/admin/divisionmaster/${favJSON.typeId}`,
	// 	data: favJSON,
	// 	headers: { 'Content-Type': 'application/json; charset=utf-8' },

	// });

	const response = await axios.patch(
		process.env.REACT_APP_BACKEND_SERVER +
			'/admin/divisionmaster/' +
			favJSON.typeId,
		favJSON,
		config
	);

	// alert("Favourite created --- "+ response);
	return response;
};

const deleteDivision = async (id: string) => {
	console.log(id);
	const response = await axios({
		method: 'delete',
		url: `${process.env.REACT_APP_BACKEND_SERVER}/admin/divisionmaster/${id}`,
		headers: { 'Content-Type': 'application/json; charset=utf-8' },
	});
	// alert("Favourite created --- "+ response);
	return response;
};

const DivisionMasterService = {
	getAllDivisions,
	getDivision,
	saveDivision,
	editDivision,
	deleteDivision,
	getNewDivisionId,
	getDivisionByLocationId,
};

export default DivisionMasterService;
