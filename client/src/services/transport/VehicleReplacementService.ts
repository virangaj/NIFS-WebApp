import axios from "axios";
import http from "../../utils/http-common";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER;

const getAllVehiclesReplacements = () => {
  return http.get<any>("/transport/vehicle-replacement");
};

const getVehicleReplacement = (id: any) => {
  return http.get<any>(`/transport/vehicle-replacement/get/${id}`);
};

const saveVehicleReplacement = async (data: any) => {
  console.log(data);
  const response = await axios({
    method: "post",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/transport/vehicle-replacement/add`,
    data: data,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });

  return response;
};

const VehicleReplacementService = {
  getAllVehiclesReplacements,
  getVehicleReplacement,
  saveVehicleReplacement,
};

export default VehicleReplacementService;
