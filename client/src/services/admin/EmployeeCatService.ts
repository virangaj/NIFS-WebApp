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

const getAllEmpCategories = () => {
	return http.get<any>('/admin/employeecategory');
};

const getEmpCat = (id: any) => {
	return http.get<any>(`/admin/employeecategory/get/${id}`);
};

const saveEmpCat = async (favJSON: any) => {
	console.log(favJSON);
	const response = await axios({
		method: 'post',
		url: `${process.env.REACT_APP_BACKEND_SERVER}/admin/employeecategory`,
		data: favJSON,
		headers: { 'Content-Type': 'application/json; charset=utf-8' },
	});
	// alert("Favourite created --- "+ response);
	return response;
};

//get new id
const getNewEmpCatId = () => {
	return http.get('/admin/employeecategory/newid');
};

//get employee cat by location id
const getEmpCatByLocationId = (id: any) => {
	return http.get<any>(`/admin/employeecategory/location/${id}`);
};

const editEmpCat = async (favJSON: any) => {
	console.log(favJSON);
	const response = await axios({
		method: 'patch',
		url: `${process.env.REACT_APP_BACKEND_SERVER}/admin/employeecategory/update/${favJSON.empCatId}`,
		data: favJSON,
		headers: { 'Content-Type': 'application/json; charset=utf-8' },
	});

	return response;
};

const deleteEmpCat = async (id: string) => {
	console.log(id);
	const response = await axios({
		method: 'delete',
		url: `${process.env.REACT_APP_BACKEND_SERVER}/admin/employeecategory/delete/${id}`,
		headers: { 'Content-Type': 'application/json; charset=utf-8' },
	});
	// alert("Favourite created --- "+ response);
	return response;
};

const EmployeeCatService = {
	getAllEmpCategories,
	getEmpCat,
	saveEmpCat,
	editEmpCat,
	deleteEmpCat,
	getNewEmpCatId,
	getEmpCatByLocationId,
};

export default EmployeeCatService;
