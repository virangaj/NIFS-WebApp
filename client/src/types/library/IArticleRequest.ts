import { RequestStatus } from "../../constant/requestStatus";

export default interface IArticleRequest {
  documentNo: string;
  epfNo: number;
  designationId: string;
  divisionId: string;
  hod: number;
  date: string;
  nameOfJournal: string;
  publishYear: string;
  volume: string;
  issue: string;
  pages: string;
  webLink: string;
  remark: string;

  hodApproved: RequestStatus;
  dirApproved: RequestStatus;
}
