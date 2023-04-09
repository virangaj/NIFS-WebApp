export default interface IVenueMaster {
	venueId: string;
	venueName: string;
	type: string;
	availability: any;
	location: string;
	remark: string;
	capacity: number;
	dateCreated: string;
	charges: any[];
	facilities: any[];
}
