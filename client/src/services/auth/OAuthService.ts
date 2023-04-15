import axios from 'axios';

import http from '../../utils/http-common';
import IParticipantMaster from '../../types/sedu/IParticipantMaster';

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER;

const headers = (token: string) => {
	const config = {
		'Access-Control-Allow-Credentials': true,
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
		'Access-Control-Allow-Headers': 'application/json',
		Authorization: `Bearer ${token}`,
	};
};

//login
const loginRequest = async (favJSON: any) => {
	// console.log(favJSON);
	const response = await axios({
		method: 'post',
		url: `${process.env.REACT_APP_BACKEND_SERVER}/auth/login`,
		data: favJSON,
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		},
	});
	// alert("Favourite created --- "+ response);
	return response;
};

//change password
const changePassword = async (favJSON: any, token: string) => {
	console.log(token);
	const response = await axios({
		method: 'patch',
		url: `${process.env.REACT_APP_BACKEND_SERVER}/user/change-password/${favJSON.epfNo}`,
		data: favJSON,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	// alert("Favourite created --- "+ response);
	return response;
};

//login
const requestForgetPassword = async (email: any) => {
	// console.log(favJSON);
	const response = await axios({
		method: 'post',
		url: `${process.env.REACT_APP_BACKEND_SERVER}/auth/forget-password`,
		data: email,
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		},
	});
	// alert("Favourite created --- "+ response);
	return response;
};

const forgetPassword = async (data: any) => {
	console.log(data);
	const response = await axios({
		method: 'post',
		url: `${process.env.REACT_APP_BACKEND_SERVER}/auth/forget-password/${data?.id}`,
		data: data?.password,
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		},
	});
	// alert("Favourite created --- "+ response);
	return response;
};

const logout = () => {
	localStorage.removeItem('persist:employee');
};

const OAuthService = {
	loginRequest,
	changePassword,
	logout,
	forgetPassword,
	requestForgetPassword,
};

export default OAuthService;
