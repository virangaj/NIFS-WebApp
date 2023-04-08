export default interface IResignationRequest {
  documentNo: string;
  date: string;
  epfNo: number;
  designationId: string;
  divisionId: string;
  hod: number;
  remark: string;
  hodApproved: boolean;
  dirApproved: boolean;
}
