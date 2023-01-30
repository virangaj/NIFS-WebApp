import axios from 'axios';

import http from '../../utils/http-common';
import IParticipantMaster from '../../types/IParticipantMaster';

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER;

//change password
const changePassword = async (favJSON: any) => {
	console.log(favJSON);
	const response = await axios({
		method: 'patch',
		url: `${process.env.REACT_APP_BACKEND_SERVER}/user/change-password/${favJSON.epfNo}`,
		data: favJSON,
		headers: { 'Content-Type': 'application/json; charset=utf-8' },
	});
	// alert("Favourite created --- "+ response);
	return response;
};

//login
const loginRequest = async (favJSON: any) => {
	// console.log(favJSON);
	const response = await axios({
		method: 'post',
		url: `${process.env.REACT_APP_BACKEND_SERVER}/auth/login`,
		data: favJSON,
		headers: { 'Content-Type': 'application/json; charset=utf-8' },
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
};

export default OAuthService;
