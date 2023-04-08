import axios from "axios";
import http from "../../utils/http-common";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER;

const getAllQuotationRequests = async (token: any) => {
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

const getQuotationRequest = (id: any) => {
  return http.get<any>(`/procument/srn/${id}`);
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

const sendHodApproval = async (id: any, token: string, approval: boolean) => {
  const response = await axios({
    method: "put",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/procument/quotation-request/hod?approval=${approval}`,
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
    url: `${process.env.REACT_APP_BACKEND_SERVER}/procument/quotation-request/director?approval=${approval}`,
    data: id,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

const QotationRequestService = {
  getAllQuotationRequests,
  getQuotationRequest,
  saveQuotationRequest,
  sendDirectorApproval,
  sendHodApproval,
};

export default QotationRequestService;
