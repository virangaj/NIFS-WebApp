import axios from 'axios';
import http from '../../utils/http-common';

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER;

const getAllEmployeeData = async () => {
	const response = await axios({
		method: 'get',
		url: `${process.env.REACT_APP_BACKEND_SERVER}/auth/employee`,

		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		},
	});
	// alert("Favourite created --- "+ response);
	return response.data;
};

const getEmployeeDataById = (id: number) => {
	return http.get<Array<any>>(`/auth/employee/${id}`);
};

const getAllEmployeeDataWithoutDeleted = () => {
	return http.get<Array<any>>('/auth/employee/withoutdelete');
};

const getAllEmployeeDataCurrentlyNotWorking = () => {
	return http.get<Array<any>>('/auth/employee/deleted');
};

const saveEmployee = async (favJSON: any, token: string) => {
	console.log(favJSON);
	const response = await axios({
		method: 'post',
		url: `${process.env.REACT_APP_BACKEND_SERVER}/auth/employee`,
		data: favJSON,
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			Authorization: `Bearer ${token}`,
		},
	});
	// alert("Favourite created --- "+ response);
	return response;
};

//temporary delete user
const hardDelete = async (id: any, token: string) => {
	console.log(id);
	const response = await axios({
		method: 'delete',
		url: `${process.env.REACT_APP_BACKEND_SERVER}/admin/employee/harddelete/${id}`,
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			Authorization: `Bearer ${token}`,
		},
	});
	// alert("Favourite created --- "+ response);
	return response;
};

const EmployeeService = {
	getAllEmployeeData,
	getEmployeeDataById,
	saveEmployee,
	getAllEmployeeDataWithoutDeleted,
	getAllEmployeeDataCurrentlyNotWorking,
	hardDelete,
};

export default EmployeeService;
