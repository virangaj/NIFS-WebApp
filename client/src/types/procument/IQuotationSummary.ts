import { RequestStatus } from "../../constant/requestStatus";

export default interface IQuotationSummary {
  fundType: string | number | readonly string[] | undefined;
  documentNo: string;
  date: string;

  //   auto generated
  epfNo: number;
  designationId: string;
  divisionId: string;
  hod: number;
  quotationRequestNo: string;
  fileNo: string;
  srnNo: string;
  value: string;
  fund: string;
  project: string;
  remark: string;

  hodApproved: RequestStatus;
  dirApproved: RequestStatus;
}
