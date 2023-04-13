import axios from "axios";
import http from "../../utils/http-common";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER;

const getPaymentRequests = async (token: any) => {
  const response = await axios({
    method: "get",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/common/payment-request`,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
  });
  // alert("Favourite created --- "+ response);
  return response;
};

const getPaymentRequest = (id: any) => {
  return http.get<any>(`/common/over-time/${id}`);
};

const savePaymentRequest = async (data: any, token: string) => {
  console.log(token);
  const response = await axios({
    method: "post",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/common/payment-request/add`,
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
    url: `${process.env.REACT_APP_BACKEND_SERVER}/common/payment-request/hod?approval=${approval}`,
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
    url: `${process.env.REACT_APP_BACKEND_SERVER}/common/payment-request/director?approval=${approval}`,
    data: id,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};
const OverTimeService = {
  getPaymentRequest,
  getPaymentRequests,
  savePaymentRequest,
  sendDirectorApproval,
  sendHodApproval,
};

export default OverTimeService;
