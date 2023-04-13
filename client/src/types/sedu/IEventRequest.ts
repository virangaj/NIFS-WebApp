export default interface IEventRequest {
	eventId: string;
	eventType: string;
	type: string;
	title: string;
	remarks: string;
	startDate: string;
	endDate: string;
	startTime: string;
	endTime: string;
	noParticipants: number;
	budget: number;
	project: string;
	location: string;
	venueName: string;
	venueType: string;
	fundType: string;
}
