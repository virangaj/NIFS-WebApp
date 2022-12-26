import axios from "axios";

import http from "../../http-common";


axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER;

// get all facilities
const getAllFacilities = () => {
    return http.get<Array<any>>("/sedu/facility");
}


// get all charges
const getAllCharges = () => {
    return http.get<Array<any>>("/sedu/charges");
}


// set facility
const setFacilities = async (objArr:any, id:any) => {
    console.log(objArr)
    const response = await axios({
        method: "put",
        url:`${process.env.REACT_APP_BACKEND_SERVER}/sedu/venuemaster/${id}/addfacility`,
        data:objArr,
        headers: { "Content-Type": "application/json; charset=utf-8" },
    })

    return response;
}

// set charge
const setCharges = async (objArr:any, id:any) => {
    console.log(objArr)
    const response = await axios({
        method: "put",
        url:`${process.env.REACT_APP_BACKEND_SERVER}/sedu/venuemaster/${id}/addcharge`,
        data:objArr,
        headers: { "Content-Type": "application/json; charset=utf-8" },
    })
    return response;

}





const VenueOtherService = {
    getAllFacilities,
    getAllCharges,
    setFacilities,
    setCharges
}

export default VenueOtherService;