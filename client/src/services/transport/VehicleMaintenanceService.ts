import axios from "axios";
import http from "../../utils/http-common";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER;

const getAllVehicleMaintenance = () => {
  return http.get<any>("/transport/vehicle-maintenance");
};

const getVehicleMaintenance = (id: any) => {
  return http.get<any>(`/transport/vehicle-maintenance/get/${id}`);
};

const saveVehicleMaintenance = async (data: any) => {
  console.log(data);
  const response = await axios({
    method: "post",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/transport/vehicle-maintenance/add`,
    data: data,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });

  return response;
};

const VehicleMaintenanceService = {
  getAllVehicleMaintenance,
  getVehicleMaintenance,
  saveVehicleMaintenance,
};

export default VehicleMaintenanceService;
