export default interface IVehicleReplacementRequest {
  DocumentNo: string;
  vehicleNo: string;
  driver: string;
  category: string;
  amount: string;
  brand: string;
  attachment: string;
  date: string;
  startMeterReading: string;
  endMeterReading: string;
  remark: string;
}
