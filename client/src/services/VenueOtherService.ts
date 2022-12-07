import axios from "axios";

import http from "../http-common";


axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER;

const getAllFacilities = () => {
    return http.get<Array<any>>("/sedu/facility");
}

const getAllCharges = () => {
    return http.get<Array<any>>("/sedu/charges");
}


const VenueOtherService = {
    getAllFacilities,
    getAllCharges
}

export default VenueOtherService;