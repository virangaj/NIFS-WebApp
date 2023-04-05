import axios from "axios";
import http from "../../utils/http-common";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER;

const getAllArticleRequest = () => {
  return http.get<any>("/library/article-request");
};

const getArticleRequest = (id: any) => {
  return http.get<any>(`/library/article-request/get/${id}`);
};

const saveArticleRequest = async (data: any) => {
  console.log(data);

  const response = await axios({
    method: "post",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/library/article-request/add`,
    data: data,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });

  return response;
};

const ArticleRequestService = {
  getAllArticleRequest,
  getArticleRequest,
  saveArticleRequest,
};

export default ArticleRequestService;
