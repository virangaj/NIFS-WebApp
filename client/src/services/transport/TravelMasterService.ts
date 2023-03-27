import axios from "axios";
import http from "../../utils/http-common";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER;

const getAllVehicles = () => {
  return http.get<any>("/transport/vehicle-master");
};

const getVehicle = (id: any) => {
  return http.get<any>(`/transport/vehicle-master/get/${id}`);
};

const saveVehicle = async (data: any) => {
  console.log(data);
  const response = await axios({
    method: "post",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/transport/vehicle-master/add`,
    data: data,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });

  return response;
};

const TravelMasterService = {
  getAllVehicles,
  getVehicle,
  saveVehicle,
};

export default TravelMasterService;
