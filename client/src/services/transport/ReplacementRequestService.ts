import axios from "axios";
import http from "../../utils/http-common";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER;

const getAllReplacementRequest = () => {
  return http.get<any>("/transport/replacement-request");
};

const getReplacementRequest = (id: any) => {
  return http.get<any>(`/transport/replacement-request/get/${id}`);
};

const saveReplacementRequest = async (data: any) => {
  console.log(data);
  const response = await axios({
    method: "post",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/transport/replacement-request/add`,
    data: data,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });

  return response;
};

const ReplacementRequestService = {
  getAllReplacementRequest,
  getReplacementRequest,
  saveReplacementRequest,
};

export default ReplacementRequestService;
