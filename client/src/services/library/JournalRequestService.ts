import axios from "axios";
import http from "../../utils/http-common";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER;

const getAllJournalRequests = () => {
  return http.get<any>("/library/journal-request");
};

const getJournalRequest = (id: any) => {
  return http.get<any>(`/library/journal-request/get/${id}`);
};

const saveJournalRequest = async (data: any) => {
  console.log(data);

  const response = await axios({
    method: "post",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/library/journal-request/add`,
    data: data,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });

  return response;
};

const JournalRequestService = {
  getAllJournalRequests,
  getJournalRequest,
  saveJournalRequest,
};

export default JournalRequestService;
