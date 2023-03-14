export default interface ILeaveRequest {
  documentNo: string;
  date: string;
  employee: string;
  epfNo: number;
  divisionId: string;
  hod: string;
  type: string;
  leave: string;
  remainingLeave: string;
  noOfDaysTakenForTheYear: string;
  fromDate: string;
  toDate: string;
  startTime: string;
  endTime: string;
  noOfDaysRequested: string;

  leaveType: string;
  overseasContactNumber: string;
  acting: string;
  attachemnt: string;
  purpose: string;
}
