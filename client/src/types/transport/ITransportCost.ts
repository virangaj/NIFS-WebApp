import { RequestStatus } from "../../constant/requestStatus";

export default interface ITransportCost {
  documentNo: string;
  epfNo: number;
  hod: number;
  designationId: string;
  divisionId: string;
  project: string;
  tourDate: string;
  sourceOfFunding: string;
  modeOfTravel: string;
  vehicleType: string;
  driverName: string;
  vehicleNo: string;
  estimatedKM: number;
  ratePerKM: number;
  totalCost: number;
  startReading: number;
  endReading: number;
  remark: string;

  hodApproved: RequestStatus;
  dirApproved: RequestStatus;
}
