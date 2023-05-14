import axios from "axios";
import http from "../../utils/http-common";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER;

const getAllEmployeeData = () => {
  return http.get<Array<any>>("/auth/employee");
};

const getEmployeeDataById = (id: number) => {
  return http.get<Array<any>>(`/auth/employee/${id}`);
};

const getAllEmployeeDataWithoutDeleted = () => {
  return http.get<Array<any>>("/auth/employee/withoutdelete");
};

const getAllEmployeeDataCurrentlyNotWorking = () => {
  return http.get<Array<any>>("/auth/employee/deleted");
};

const saveEmployee = async (favJSON: any) => {
  console.log(favJSON);
  const response = await axios({
    method: "post",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/auth/employee`,
    data: favJSON,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
  // alert("Favourite created --- "+ response);
  return response;
};

//temporary delete user
const deleteEmployee = async (id: any, token: string) => {
  console.log(id);
  const response = await axios({
    method: "patch",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/auth/employee/delete/${id}`,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
  });
  // alert("Favourite created --- "+ response);
  return response;
};

const EmployeeService = {
  getAllEmployeeData,
  getEmployeeDataById,
  saveEmployee,
  getAllEmployeeDataWithoutDeleted,
  getAllEmployeeDataCurrentlyNotWorking,
  deleteEmployee,
};

export default EmployeeService;
