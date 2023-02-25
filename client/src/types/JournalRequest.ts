export default interface IJournalRequest {
  documentNo: string;
  employee: string;
  designation: string;
  division: string;
  headOfLibrary: string;
  project: string;
  vote: string;
  budget: string; // have to look into this again
  journalName: string;
  date: string;
  periodOfRequest: string;
  totalAmountDue: string;
  currencyType: string;
  ISSN_No: string;
  type: string;
  methodOfPayment: string;
  attachment: string;
  remark: string;
}
