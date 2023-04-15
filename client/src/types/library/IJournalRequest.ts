import { RequestStatus } from "../../constant/requestStatus";

export default interface IJournalRequest {
  documentNo: string;
  epfNo: number;
  designationId: string;
  divisionId: string;
  hod: number;
  project: string;
  vote: string;
  journalName: string;
  date: string;
  periodOfRequest: string;
  totalAmountDue: string;
  currencyType: string;
  ISSN_No: string;
  type: string;
  methodOfPayment: string;
  remark: string;

  hodApproved: RequestStatus;
  dirApproved: RequestStatus;
}
