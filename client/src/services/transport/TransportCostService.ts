import axios from "axios";
import http from "../../utils/http-common";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER;

const getAllTransportCost = async (token: any) => {
  const response = await axios({
    method: "get",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/transport/transport-cost`,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
  });
  // alert("Favourite created --- "+ response);
  return response;
};

const getTransportCost = (id: any) => {
  return http.get<any>(`/transport/transport-cost/${id}`);
};

const saveTransportCost = async (data: any, token: string) => {
  console.log(token);
  const response = await axios({
    method: "post",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/transport/transport-cost/add`,
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
    url: `${process.env.REACT_APP_BACKEND_SERVER}/transport/transport-cost/hod?approval=${approval}`,
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
    url: `${process.env.REACT_APP_BACKEND_SERVER}/transport/transport-cost/director?approval=${approval}`,
    data: id,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

const TransportCostSerice = {
  getAllTransportCost,
  getTransportCost,
  saveTransportCost,
  sendHodApproval,
  sendDirectorApproval,
};

export default TransportCostSerice;
