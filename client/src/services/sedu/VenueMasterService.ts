import axios from "axios";

import http from "../../http-common";
import IVenueMaster from '../../types/VenueMaster'


axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER;

const getAllVenues = () => {
  return http.get<Array<any>>("/sedu/venuemaster");
};

const getVenue = (id: any) => {
  return http.get<IVenueMaster>(`/sedu/venuemaster/${id}`);
};


const getNewVenueId = () => {
  return http.get("/sedu/venuemaster/newid");
}


const saveVenue = async (favJSON:any) => {
  console.log(favJSON)
  const response = await axios({
    method: "post",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/sedu/venuemaster`,
    data: favJSON,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
  // alert("Favourite created --- "+ response);
  return response;

};


const VenueMasterService = {
  getAllVenues,
  getVenue,
  saveVenue,
  getNewVenueId,
 
};

export default VenueMasterService;
