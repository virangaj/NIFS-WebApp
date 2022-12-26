import axios from 'axios';

import http from '../../http-common';

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER;

const getAllLocations = () => {
	return http.get<Array<any>>('/admin/locations');
};

const getLocationById = (id: any) => {
	return http.get<any>(`/admin/locations/${id}`);
};


const saveLocations = async (favJSON: any) => {
	console.log(favJSON);
	const response = await axios({
		method: 'post',
		url: `${process.env.REACT_APP_BACKEND_SERVER}/admin/locations`,
		data: favJSON,
		headers: { 'Content-Type': 'application/json; charset=utf-8' },
	});
	// alert("Favourite created --- "+ response);
	return response;
};

const LocationMasterService = {
	getAllLocations,
	getLocationById,
	saveLocations,
};

export default LocationMasterService;
