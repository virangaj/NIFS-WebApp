import { RequestStatus } from "../../constant/requestStatus";

export default interface IAccommodation {
  documentNo: string;
  epfNo: number;
  designationId: string;
  divisionId: string;
  hod: number;

  //gueset details
  date: string;
  guestName: string;
  address: string;
  email: string;
  nicNo: string;
  telephoneNo: string;

  //reason for request accommodation
  requestType: string;

  //accommodation
  roomNumber: string;
  noOfDays: number;
  fromDate: string;
  toDate: string;
  roomRates: string;
  roomType: string;
  totalCharges: string;

  //payment
  payee: string;

  hodApproved: RequestStatus;
  dirApproved: RequestStatus;
}
