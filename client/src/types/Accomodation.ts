export default interface IAccomodation {
  documentNo: string;
  documentDate: string;
  guestName: string;
  address: string;
  email: string;
  designation: string;
  nicNo: string;
  nationality: string;
  telephoneNo: string;
  passportNo: string;
  faxNo: string;

  // host
  employee: string;
  division: string;
  hostDesignation: string;
  project: string;

  // reasons for request accomodation

  //official or personal
  officialOrPersonal: string;
  details: string;

  // accomodation
  location: string;
  from: string;
  to: string;
  roomRates: string;
  noOfDays: string;
  totalCharges: string;

  //TODO mutiple checkboxes to implement
}
