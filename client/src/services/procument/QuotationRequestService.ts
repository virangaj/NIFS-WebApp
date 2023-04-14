import axios from "axios";

import http from "../../utils/http-common";
import { RequestStatus } from "../../constant/requestStatus";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER;

const getAllQuotationRequest = async (token: any) => {
  // console.log(token);
  const response = await axios({
    method: "get",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/procument/quotation-request`,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
  });
  // alert("Favourite created --- "+ response);
  return response;
};
const getDivisionQuotationRequest = async (token: any, division: string) => {
  // console.log(token);
  const response = await axios({
    method: "get",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/procument/quotation-request?division=${division}`,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
  });
  // alert("Favourite created --- "+ response);
  return response;
};

const getQuotationRequest = (id: any) => {
  return http.get<any>(`/procument/quotation-request/get/${id}`);
};

const saveQuotationRequest = async (data: any, token: string) => {
  console.log(token);
  const response = await axios({
    method: "post",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/procument/quotation-request/add`,
    data: data,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
  });
  // alert("Favourite created --- "+ response);
  return response;
};

const sendHodApproval = async (
  id: any,
  token: string,
  approval: RequestStatus
) => {
  const response = await axios({
    method: "put",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/procument/quotation-request/hod/status?approval=${approval}`,
    data: id,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

const sendDirApproval = async (
  id: any,
  token: string,
  approval: RequestStatus
) => {
  const response = await axios({
    method: "put",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/procument/quotation-request/director/status?approval=${approval}`,
    data: id,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

const QuotationRequestService = {
  getAllQuotationRequest,
  getQuotationRequest,
  getDivisionQuotationRequest,
  saveQuotationRequest,
  sendHodApproval,
  sendDirApproval,
};

export default QuotationRequestService;
