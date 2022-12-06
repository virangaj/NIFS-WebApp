import axios from "axios";

import http from "../http-common";
import IVenueFacility from "../types/VenueFacility";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER;

const getAllFacilities = () => {
    http.get<Array<any>>("/sedu/facility");
}

