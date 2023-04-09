import axios from 'axios';

import http from '../../utils/http-common';
import IVenueMaster from '../../types/sedu/IVenueMaster';

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER;

const getAllVenues = () => {
	return http.get<Array<any>>('/sedu/venuemaster');
};

const getVenue = (id: any) => {
	return http.get<IVenueMaster>(`/sedu/venuemaster/${id}`);
};

const getNewVenueId = () => {
	return http.get('/sedu/venuemaster/newid');
};

const saveVenue = async (data: any, token: string) => {
	console.log(data);
	const response = await axios({
		method: 'post',
		url: `${process.env.REACT_APP_BACKEND_SERVER}/sedu/venuemaster`,
		data: data,
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			Authorization: `Bearer ${token}`,
		},
	});
	// alert("Favourite created --- "+ response);
	return response;
};

const VenueMasterService = {
	getAllVenues,
	getVenue,
	saveVenue,
	getNewVenueId,
};

export default VenueMasterService;
