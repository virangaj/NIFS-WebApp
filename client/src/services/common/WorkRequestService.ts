import axios from "axios";
import http from "../../utils/http-common";
import { RequestStatus } from "../../constant/requestStatus";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER;

const getWorkRequests = async (token: any) => {
  const response = await axios({
    method: "get",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/common/work-request`,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
  });
  // alert("Favourite created --- "+ response);
  return response;
};

//get all constrsac t accodung to admin
const getDivisionWorkRequests = async (token: any, division: string) => {
  const response = await axios({
    method: "get",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/common/work-request?division=${division}`,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
  });
  // alert("Favourite created --- "+ response);
  return response;
};

const getWorkRequest = (id: any) => {
  return http.get<any>(`/common/work-request/${id}`);
};

const saveWorkRequest = async (data: any, token: string) => {
  console.log(token);
  const response = await axios({
    method: "post",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/common/work-request/add`,
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
    url: `${process.env.REACT_APP_BACKEND_SERVER}/common/work-request/hod/status?approval=${approval}`,
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
  approval: RequestStatus
) => {
  const response = await axios({
    method: "put",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/common/work-request/director/status?approval=${approval}`,
    data: id,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};
const WorkRequestService = {
  getWorkRequest,
  getWorkRequests,
  getDivisionWorkRequests,
  saveWorkRequest,
  sendDirectorApproval,
  sendHodApproval,
};

export default WorkRequestService;
