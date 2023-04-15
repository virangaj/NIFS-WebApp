import { RequestStatus } from "../../constant/requestStatus";

export default interface IAnnualIncrement {
  // generated
  documentNo: string;
  epfNo: number;
  hod: number;
  designationId: string;
  divisionId: string;

  remark: string;
  date: string;

  noOfLeaves: string;
  salaryScale: string;
  presentSalary: string;
  newSalary: string;

  hodApproved: RequestStatus;
  dirApproved: RequestStatus;
}
