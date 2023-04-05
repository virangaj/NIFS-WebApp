export default interface IResignationRequest {
	documentNo: string;
	date: string;
	epfNo: number;
	designationId: string;
	divisionId: string;
	hod: string;
	remark: string;
	hodApproved: boolean;
	dirApproved: boolean;
}
