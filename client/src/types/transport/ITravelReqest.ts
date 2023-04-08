export default interface ITravelRequest {
  documentNo: string;
  epfNo: 0;
  designationId: string;
  divisionId: string;
  hod: number;
  sourceOfFunding: string;
  purpose: string;
  locationAndRoute: string;
  requestDate: string;
  arrivalDate: string;
  time: string;
  otherPassengers: string;
  modeOfTravel: string;
  vehicleType: string;
}
