import { RequestStatus } from "../../constant/requestStatus";

export default interface Isrn {
  documentNo: string;
  date: string;
  epfNo: 0;
  divisionId: string;
  designationId: string;
  hod: number;
  project: string;
  srnType: string;
  itemType: string;
  purchaseType: string;
  estimatedValue: string;
  vote: string;
  fundAllocationForTheProject: string;
  description: string;
  googleLink: string;

  hodApproved: RequestStatus;
  dirApproved: RequestStatus;
}
