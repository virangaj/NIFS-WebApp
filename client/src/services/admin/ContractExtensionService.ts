import axios from 'axios';

import http from '../../utils/http-common';

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER;

const getAllContractExtensions = () => {
	return http.get<any>('/admin/contractex');
};

const getContractExtension = (id: any) => {
	return http.get<any>(`/admin/contractex/get/${id}`);
};

const saveContractExtension = async (data: any) => {
	const response = await axios({
		method: 'post',
		url: `${process.env.REACT_APP_BACKEND_SERVER}/admin/contractex/add`,
		data: data,
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		},
	});
	// alert("Favourite created --- "+ response);
	return response;
};

const ContractExtensionService = {
	getAllContractExtensions,
	getContractExtension,
	saveContractExtension,
};

export default ContractExtensionService;
