export default interface IEventRequest {
	documentNo: string;
	eventType: string;
	title: string;
	remark: string;
	startDate: string;
	endDate: string;
	startTime: string;
	endTime: string;
	noParticipants: number;
	budget: number;
	projectId: string;
	locationId: string;
	venueId: string;
	fundingId: string;
}
