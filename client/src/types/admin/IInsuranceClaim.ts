export default interface IInsuranceClaim {
  // generated
  documentNo: string;
  epfNo: number;
  hod: number;
  designationId: string;
  divisionId: string;
  date: string;

  noOfClaims: number;
  claimAmount: number;
  totalBillAmount: number;
  paidClaimAmount: number;
  notPaidClaimAmount: number;
  claimPaidDate: string;
  spectacleClaimDate: string;
  remark: string;
}
