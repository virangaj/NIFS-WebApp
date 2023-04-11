import axios from "axios";
import http from "../../utils/http-common";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER;

const getContractExtensionRequests = async (token: any) => {
  const response = await axios({
    method: "get",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/admin/contract-extension`,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
  });
  // alert("Favourite created --- "+ response);
  return response;
};

const getContractExtensionRequest = (id: any) => {
  return http.get<any>(`/admin/contract-extension/${id}`);
};

const saveContractExtensionRequest = async (data: any, token: string) => {
  console.log(token);
  const response = await axios({
    method: "post",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/admin/contract-extension/add`,
    data: data,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
  });
  // alert("Favourite created --- "+ response);
  return response;
};

const sendHodApproval = async (id: any, token: string, approval: boolean) => {
  const response = await axios({
    method: "put",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/admin/contract-extension/hod?approval=${approval}`,
    data: id,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

const sendDirectorApproval = async (
  id: any,
  token: string,
  approval: boolean
) => {
  const response = await axios({
    method: "put",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/admin/contract-extension/director?approval=${approval}`,
    data: id,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};
const getContractExtensionService = {
  getContractExtensionRequest,
  getContractExtensionRequests,
  saveContractExtensionRequest,
  sendDirectorApproval,
  sendHodApproval,
};

export default getContractExtensionService;
