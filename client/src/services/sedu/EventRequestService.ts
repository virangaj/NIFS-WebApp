import axios from 'axios';

import http from '../../utils/http-common';
import IParticipantMaster from '../../types/sedu/IParticipantMaster';

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER;

const newEventRequest = async (data: any, token: string) => {
	console.log(data);
	const response = await axios({
		method: 'post',
		url: `${process.env.REACT_APP_BACKEND_SERVER}/sedu/event-master/add`,
		data: data,
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			Authorization: `Bearer ${token}`,
		},
	});
	// alert("Favourite created --- "+ response);
	return response;
};

const getAllEvents = async () => {
	const response = await axios({
		method: 'get',
		url: `${process.env.REACT_APP_BACKEND_SERVER}/sedu/event-master`,
	});
	// alert("Favourite created --- "+ response);
	return response;
};

const getEventById = async (id: string) => {
	const response = await axios({
		method: 'get',
		url: `${process.env.REACT_APP_BACKEND_SERVER}/sedu/event-master/${id}`,
	});
	// alert("Favourite created --- "+ response);
	return response;
};

const EventRequestService = {
	newEventRequest,
	getAllEvents,
	getEventById,
};

export default EventRequestService;
