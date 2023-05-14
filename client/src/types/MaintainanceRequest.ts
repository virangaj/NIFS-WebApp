export default interface IMaintainanceRequest {
  documentNo: string;
  date: string;
  vehicleNo: string;
  workshop: string;
  cost: string;
  description: string;
  attachment: string;
  startMeterReading: string;
  endMeterReading: string;
  remark: string;
}
