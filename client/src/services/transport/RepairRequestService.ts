import axios from "axios";
import http from "../../utils/http-common";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER;

const getAllRepairRequests = () => {
  return http.get<any>("/transport/repair-request");
};

const getRepairRequest = (id: any) => {
  return http.get<any>(`/transport/repair-request/get/${id}`);
};

const saveRepairRequest = async (data: any) => {
  console.log(data);

  const response = await axios({
    method: "post",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/transport/repair-request/add`,
    data: data,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
  return response;
};

const RepairRequestService = {
  getAllRepairRequests,
  getRepairRequest,
  saveRepairRequest,
};

export default RepairRequestService;
