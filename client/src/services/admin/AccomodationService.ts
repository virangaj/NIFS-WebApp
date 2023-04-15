import axios from "axios";
import http from "../../utils/http-common";
import { RequestStatus } from "../../constant/requestStatus";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER;

const getAccomodationRequests = async (token: any) => {
  const response = await axios({
    method: "get",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/admin/accomodation`,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
  });
  // alert("Favourite created --- "+ response);
  return response;
};

//get all constrsac t accodung to admin
const getDivisionAccomodationRequests = async (
  token: any,
  division: string
) => {
  const response = await axios({
    method: "get",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/admin/accomodation?division=${division}`,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
  });
  // alert("Favourite created --- "+ response);
  return response;
};

const getAccomodationRequest = (id: any) => {
  return http.get<any>(`/admin/accomodation/${id}`);
};

const saveAccomodationRequest = async (data: any, token: string) => {
  console.log(token);
  const response = await axios({
    method: "post",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/admin/accomodation/add`,
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
    url: `${process.env.REACT_APP_BACKEND_SERVER}/admin/accomodation/hod/status?approval=${approval}`,
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
    url: `${process.env.REACT_APP_BACKEND_SERVER}/admin/accomodation/director/status?approval=${approval}`,
    data: id,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};
const AccomodationService = {
  getAccomodationRequest,
  getAccomodationRequests,
  getDivisionAccomodationRequests,
  saveAccomodationRequest,
  sendDirectorApproval,
  sendHodApproval,
};

export default AccomodationService;
