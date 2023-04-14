import axios from "axios";

import http from "../../utils/http-common";
import { RequestStatus } from "../../constant/requestStatus";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER;

const getAllTravelRequest = async (token: any) => {
  // console.log(token);
  const response = await axios({
    method: "get",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/transport/travel-request`,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
  });
  // alert("Favourite created --- "+ response);
  return response;
};
const getDivisionTravelRequest = async (token: any, division: string) => {
  // console.log(token);
  const response = await axios({
    method: "get",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/transport/travel-request?division=${division}`,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
  });
  // alert("Favourite created --- "+ response);
  return response;
};

const getTravelRequest = (id: any) => {
  return http.get<any>(`/transport/travel-request/get/${id}`);
};

const saveTravelRequest = async (data: any, token: string) => {
  console.log(token);
  const response = await axios({
    method: "post",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/transport/travel-request/add`,
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
    url: `${process.env.REACT_APP_BACKEND_SERVER}/transport/travel-request/hod/status?approval=${approval}`,
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
    url: `${process.env.REACT_APP_BACKEND_SERVER}/transport/travel-request/director/status?approval=${approval}`,
    data: id,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

const TravelRequestService = {
  getAllTravelRequest,
  getTravelRequest,
  getDivisionTravelRequest,
  saveTravelRequest,
  sendHodApproval,
  sendDirApproval,
};

export default TravelRequestService;
