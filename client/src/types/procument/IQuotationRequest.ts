export default interface IQuotationRequest {
  epfNo: number;
  designationId: string;
  divisionId: string;
  hod: number;

  documentNo: string;
  date: string;
  project: string;
  fund: string;
  srnNo: string;
  fileNo: string;
  validityPeriodOfTheQuotation: string;
  shippingTerms: string;
  supplierCatergory: string;
  bidStartingDate: string;
  bidClosingDate: string;
  remark: string;
}
