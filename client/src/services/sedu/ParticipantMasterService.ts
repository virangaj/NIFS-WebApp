import axios from "axios";

import http from "../../http-common";
import IParticipantMaster from '../../types/ParticipantMaster'


axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER;

const getAllParticipants = () => {
  return http.get<Array<any>>("/participantmaster");
};

const getParticipant = (id: any) => {
  return http.get<IParticipantMaster>(`/participantmaster/${id}`);
};

const saveParticipant = async (favJSON:any) => {
  console.log(favJSON)
  const response = await axios({
    method: "post",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/participantmaster`,
    data: favJSON,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
  // alert("Favourite created --- "+ response);
  return response;

};


const ParticipantMasterService = {
  getAllParticipants,
  getParticipant,
  saveParticipant,
 
};

export default ParticipantMasterService;
