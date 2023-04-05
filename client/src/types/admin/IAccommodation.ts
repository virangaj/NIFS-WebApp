export default interface IAccommodation {
	//gueset details
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

	//host details
	hostEmployee: string;
	project: '';
	//reason for request accommodation
	requestType: string;
	officialProgram: string;

	//accommodation
	location: string;
	noOfDays: number;
	fromDate: string;
	toDate: string;
	roomRates: string;
	roomType: string;
	totalCharges: string;

	//payment
	payee: string;
}
