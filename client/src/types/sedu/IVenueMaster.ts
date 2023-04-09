export default interface IVenueMaster {
	venueId: string;
	venueName: string;
	type: string;
	availability: any;
	location: string;
	remark: string;
	capacity: number;
	createdOn: string;
	modifiedOn: string;
	createdBy: number;
	modifiedBy: number;
	charges: any[];
	facilities: any[];
}
