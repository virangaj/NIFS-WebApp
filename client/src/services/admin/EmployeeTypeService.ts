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

const getAllEmpTypes = () => {
	return http.get<any>('/admin/employeetype');
};

const getEmpType = (id: any) => {
	return http.get<any>(`/admin/employeetype/${id}`);
};

const saveEmpType = async (favJSON: any) => {
	console.log(favJSON);
	const response = await axios({
		method: 'post',
		url: `${process.env.REACT_APP_BACKEND_SERVER}/admin/employeetype`,
		data: favJSON,
		headers: { 'Content-Type': 'application/json; charset=utf-8' },
	});
	return response;
};

//get new id
const getNewEmpTypeId = () => {
	return http.get('/admin/employeetype/newid');
};

//get employee cat by location id
const getEmpTypeByLocationId = (id: any) => {
	return http.get<any>(`/admin/employeetype/location/${id}`);
};

const editEmpType = async (favJSON: any) => {
	console.log(favJSON);
	const response = await axios({
		method: 'patch',
		url: `${process.env.REACT_APP_BACKEND_SERVER}/admin/employeetype/update/${favJSON.empTypeId}`,
		data: favJSON,
		headers: { 'Content-Type': 'application/json; charset=utf-8' },
	});
	return response;
};

const deleteEmpType = async (id: string) => {
	console.log(id);
	const response = await axios({
		method: 'delete',
		url: `${process.env.REACT_APP_BACKEND_SERVER}/admin/employeetype/delete/${id}`,
		headers: { 'Content-Type': 'application/json; charset=utf-8' },
	});
	// alert("Favourite created --- "+ response);
	return response;
};

const EmployeeTypeService = {
	getAllEmpTypes,
	getEmpType,
	saveEmpType,
	editEmpType,
	deleteEmpType,
	getNewEmpTypeId,
	getEmpTypeByLocationId,
};

export default EmployeeTypeService;
