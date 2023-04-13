export default interface IGatePass {
  //   auto generated
  epfNo: number;
  designationId: string;
  divisionId: string;
  hod: number;

  // gate pass
  documentNo: string;
  locationAfterRemoval: string;
  purposeOfRemoval: string;
  dateOfRemoval: string;
  expectedReturnDate: string;
  remark: string;

  //   desciption of items to be removed

  itemName: string;
  itemType: string;
  quantity: string;
  inventoryNumber: string;
  description: string;
  currentLocation: string;
  officerInChargeName: string;
  nameOfOfficerOutsideIncharge: string;
  resultOfVerificationBySecurityOfficer: string;
}
