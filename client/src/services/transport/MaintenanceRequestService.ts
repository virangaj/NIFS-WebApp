import axios from "axios";
import http from "../../utils/http-common";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER;

const getAllMaintenanceRequest = () => {
  return http.get<any>("/transport/maintenance-request");
};

const getMaintenanceRequest = (id: any) => {
  return http.get<any>(`/transport/maintenance-request/get/${id}`);
};

const saveMaintenanceRequest = async (data: any) => {
  console.log(data);
  const response = await axios({
    method: "post",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/transport/maintenance-request/add`,
    data: data,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
  return response;
};

const MaintenanceRequestService = {
  getAllMaintenanceRequest,
  getMaintenanceRequest,
  saveMaintenanceRequest,
};

export default MaintenanceRequestService;
