import axios from 'axios';
import http from '../../utils/http-common';

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER;

//get all funding sources
const getAllFundingServices = () => {
	return http.get<any>(`/common/funding-source`);
};

//create new funding source
const saveFundingSource = async (data: any, token: string) => {
	console.log(token);
	const response = await axios({
		method: 'post',
		url: `${process.env.REACT_APP_BACKEND_SERVER}/common/funding-source/add`,
		data: data,
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			Authorization: `Bearer ${token}`,
		},
	});
	// alert("Favourite created --- "+ response);
	return response;
};

const updateFunding = async ({ data, token }: any) => {
	console.log(data);
	const response = await axios({
		method: 'put',
		url: `${process.env.REACT_APP_BACKEND_SERVER}/common/funding-source/update/${data.fundingId}`,
		data: data,
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			Authorization: `Bearer ${token}`,
		},
	});

	return response;
};

const FundingSourceService = {
	saveFundingSource,
	getAllFundingServices,
	updateFunding,
};

export default FundingSourceService;
