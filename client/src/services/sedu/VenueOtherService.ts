import axios from 'axios';

import http from '../../utils/http-common';

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER;

// get all charges
const getAllCharges = () => {
	return http.get('/sedu/charges');
};
// get charge new id
const getNewChargeId = () => {
	return http.get('/sedu/charges/newid');
};

// create charge
const saveCharge = async (data: any, token: string) => {
	// console.log(data, token);
	const response = await axios({
		method: 'post',
		url: `${process.env.REACT_APP_BACKEND_SERVER}/sedu/charges/add`,
		data: data,
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			Authorization: `Bearer ${token}`,
		},
	});
	return response.data;
};
//update charge
const updateCharge = async (data: any, token: any) => {
	console.log(data);
	const response = await axios({
		method: 'put',
		url: `${process.env.REACT_APP_BACKEND_SERVER}/sedu/charges/update/${data?.chargeId}`,
		data: data,
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			Authorization: `Bearer ${token}`,
		},
	});
	return response.data;
};

// set charge
const setCharges = async (objArr: any, id: any) => {
	console.log(objArr);
	const response = await axios({
		method: 'put',
		url: `${process.env.REACT_APP_BACKEND_SERVER}/sedu/venuemaster/${id}/addcharge`,
		data: objArr,
		headers: { 'Content-Type': 'application/json; charset=utf-8' },
	});
	return response;
};

// get all facilities
const getAllFacilities = () => {
	return http.get<Array<any>>('/sedu/facility');
};
// get charge new id
const getNewFacilityId = () => {
	return http.get('/sedu/facility/newid');
};

// create charge
const saveFacility = async (data: any, token: string) => {
	// console.log(data, token);
	const response = await axios({
		method: 'post',
		url: `${process.env.REACT_APP_BACKEND_SERVER}/sedu/facility/add`,
		data: data,
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			Authorization: `Bearer ${token}`,
		},
	});
	return response.data;
};
//update charge
const updateFacility = async (data: any, token: any) => {
	console.log(data);
	const response = await axios({
		method: 'put',
		url: `${process.env.REACT_APP_BACKEND_SERVER}/sedu/facility/update/${data?.chargeId}`,
		data: data,
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			Authorization: `Bearer ${token}`,
		},
	});
	return response.data;
};

// set facility
const setFacilities = async (objArr: any, id: any) => {
	console.log(objArr);
	const response = await axios({
		method: 'put',
		url: `${process.env.REACT_APP_BACKEND_SERVER}/sedu/venuemaster/${id}/addfacility`,
		data: objArr,
		headers: { 'Content-Type': 'application/json; charset=utf-8' },
	});

	return response;
};

const VenueOtherService = {
	getAllCharges,
	saveCharge,
	updateCharge,
	setCharges,
	getNewChargeId,
	getAllFacilities,
	saveFacility,
	getNewFacilityId,
	setFacilities,
};

export default VenueOtherService;
