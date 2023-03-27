import axios from "axios";
import http from "../../utils/http-common";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER;

const getAllVehicleRepairs = () => {
  return http.get<any>("/transport/vehicle-repair");
};

const getVehicleRepair = (id: any) => {
  return http.get<any>(`/transport/vehicle-repair/get/${id}`);
};

const saveVehicleRepair = async (data: any) => {
  console.log(data);

  const response = await axios({
    method: "post",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/transport/vehicle-repair/add`,
    data: data,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });

  return response;
};

const VehicleRepairService = {
  getAllVehicleRepairs,
  getVehicleRepair,
  saveVehicleRepair,
};

export default VehicleRepairService;
