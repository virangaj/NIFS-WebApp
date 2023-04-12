import { RequestStatus } from "../../constant/requestStatus";

export default interface IContractExtension {
  documentNo: string;
  date: string;
  epfNo: number;
  designationId: string;
  divisionId: string;
  hod: number;
  remark: string;
  hodApproved: RequestStatus;
  dirApproved: RequestStatus;
}
