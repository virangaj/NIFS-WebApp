export default interface IQuotationRequest {
  documentNo: string;
  date: string;
  epfNo: number;
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
