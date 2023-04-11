import axios from 'axios';
import http from '../../utils/http-common';

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER;

//create a new project
const createProject = async ({ data, token }: any) => {
	console.log(data);
	const response = await axios({
		method: 'post',
		url: `${process.env.REACT_APP_BACKEND_SERVER}/common/project/add`,
		data: data,
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			Authorization: `Bearer ${token}`,
		},
	});
	return response.data;
};

const updateProject = async ({ data, token }: any) => {
	console.log(data);
	const response = await axios({
		method: 'put',
		url: `${process.env.REACT_APP_BACKEND_SERVER}/common/project/update/${data.projectId}`,
		data: data,
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			Authorization: `Bearer ${token}`,
		},
	});

	return response;
};

//get all projects from the database
const getAllProjects = async () => {
	return http.get<Array<any>>('/common/project');
};

const ProjectService = {
	createProject,
	getAllProjects,
	updateProject,
};

export default ProjectService;
