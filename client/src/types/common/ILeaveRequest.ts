import { RequestStatus } from "../../constant/requestStatus";

export default interface ILeaveRequest {
  // generated
  documentNo: string;
  epfNo: number;
  hod: number;
  designationId: string;
  divisionId: string;

  leaveType: string;
  startDate: string;
  startTime: string;
  durationInDays: string;

  requestDateOptional: string;
  jobCategory: string;
  evidence: string;

  hodApproved: RequestStatus;
  dirApproved: RequestStatus;
}
