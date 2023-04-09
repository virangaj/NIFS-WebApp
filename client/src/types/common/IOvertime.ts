export default interface IOvertime {
  documentNo: string;
  date: string;
  //   auto generated
  epfNo: number;
  hod: number;
  designationId: string;
  divisionId: string;

  noOfHoursRequested: string;
  noOfHoursOTDone: string;
  nameOfWorkToBeDone: string;
  necessityToWorkOvertime: string;
  remark: string;
}
