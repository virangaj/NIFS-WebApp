import { EventRepresentative } from '../../constant/eventRepresentative';

export default interface IRepresentativeMaster {
	participantId: string;
	participantType: EventRepresentative;
	name: string;
	nic: string;
	contactNo: string;
	address: string;
	email: string;
}
