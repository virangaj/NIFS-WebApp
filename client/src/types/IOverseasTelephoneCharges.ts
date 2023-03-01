export default interface IOverseasTelephoneCharges {
  // Telephone Details
  documentNo: string;
  date: string;
  remark: string;

  // sender Details
  employee: string;
  sendDate: string;
  project: string;

  // Receiver Details
  name: string;
  address: string;

  // message Details
  telephoneNo: string;
  type: string;
  country: string;
}
