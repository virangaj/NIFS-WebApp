export enum RouteName {
	//  main pages
	Home = '/',
	Login = '/login',
	ChangePassword = '/changepassword',
	Common = '/common/*',
	Account = '/account/*',
	Admin = '/admin/*',
	Library = '/library/*',
	Procument = '/procument/*',
	Sedu = '/sedu/*',
	Transport = '/transport/*',
	UserPermission = '/user-permission/*',
	Notification = '/notification/*',
	Help = '/help/*',
	ErrorPage = '/error-404',

	// sedu
	SeduVenueMaster = '/venue-master',
	SeduParticipantMaster = '/participant-master',
	SeduBooking = '/booking',
	SeduEventRequest = '/event-request',
	SeduAttendanceFeedback = '/attendance-feedback',
	SeduUpdateMaterial = '/update-material',
	SeduQuickResponse = '/quick-response',
	SeduProjectProposal = '/project-proposal',
	SeduMaterialSearch = '/material-search',
	SeduReportGenerator = '/report-generator',

	//   common

	WorkRequest = '/work-request',
	LeaveRequest = '/leave-request',
	OverTime = '/over-time',
	PaymentRequest = '/payment-request',
	DailyAttendance = '/daily-attendance',
	CommonReportGenerator = '/common-report-generator',

	// Transport
	TransportVehicleMaster = '/vehicle-master',
	TransportVehicleReplacement = '/vehicle-replacement',
	TransportVehicleMaintenance = '/vehicle-maintenance',
	TransportVehicleRepair = '/vehicle-repair',
	TransportVehicleReplacementRequest = '/vehicle-replacement-request',
	TransportVehicleMaintenanceRequest = '/vehicle-maintenance-request',
	TransportVehicleRepairRequest = '/vehicle-repair-request',
	TranportReports = '/report',

	// Library
	LibraryArticleRequest = '/article-request',
	LibraryJournalRequest = '/journal-request',
	LibraryItemsBurrowAndReturn = '/itemBurrow-return',
	LibraryCatalogSearch = '/catalog-search',

	//admin
	AdministrativeReport = '/administrative-report',
	LocalTelCahrges = '/local-tel-charges',
	Accommodation = '/accommodation',
	OverseasTelCahrges = '/overseas-tel-charges',
	TrainerVolunteerAttendance = '/trainer-volunteer-attendance',
	InsuranceClaims = '/insurance-claim',
	AnnualIncrementRequest = '/annual-increment-request',
	Promotion = '/promotion',
	ContractExtension = '/contract-extension',
	ResignationRequest = '/resignation-request',
	AdminReportGenerator = '/report-generator',

	//admin pages
	AdminAdmin = '/dashboard/admin/admin/*',
	SeduAdmin = '/dashboard/sedu/admin/*',
	TransportAdmin = '/dashboard/transport/admin/*',
	ProcumentAdmin = '/dashboard/procument/admin/*',
	LibraryAdmin = '/dashboard/library/admin/*',
	CommonAdmin = '/dashboard/common/admin/*',
	Director = '/dashboard/director/admin/*',

	//sub routes of administrator admin
	Employee = '/employee',
	EmployeeType = '/employee-type',
	EmployeeCategory = '/employee-category',
	Designation = '/designations',
	Divisions = '/divisions',
	AdminResignationReq = '/resignation-request',

	//procument pages
	GatePass = '/gate-pass',
	Srn = '/srn',
	QuotationRequest = '/quotation-request',
	QuotationSummary = '/quotation-summary',

	//director pages
	DirectorResignationReq = '/resignation-request',
}
