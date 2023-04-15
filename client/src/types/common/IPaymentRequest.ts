import { RequestStatus } from "../../constant/requestStatus";

export default interface IPaymentRequest {
  // generated
  documentNo: string;
  epfNo: number;
  hod: number;
  designationId: string;
  divisionId: string;
  date: string;

  description: string;
  remark: string;
  grossAmount: number;
  friegthCharge: number;
  clearingCharge: number;
  directorGeneralCharge: number;
  customCharge: number;
  courierCharge: number;
  airLineCharge: number;
  handlingCharge: number;
  insurance: number;
  otherCharge: number;

  hodApproved: RequestStatus;
  dirApproved: RequestStatus;
}
