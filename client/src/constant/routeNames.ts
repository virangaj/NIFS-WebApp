export enum RouteName {
  
  //  main pages
  Home = "/",
  Login = "/login",
  Common= "/common/*",
  Account= "/account/*",
  Admin= "/admin/*",
  Library= "/library/*",
  Procument= "/procument/*",
  Sedu= "/sedu/*",
  Transport= "/transport/*",
  UserPermission= "/user-permission/*",
  Notification= "/notification/*",
  Help= "/help/*",
  ErrorPage= "/error-404",


  // sedu
  SeduVenueMaster = "/venue-master",
  SeduParticipantMaster = "/participant-master",
  SeduBooking = "/booking",
  SeduEventRequest = "/event-request",
  SeduAttendanceFeedback = "/attendance-feedback",
  SeduUpdateMaterial = "/update-material",
  SeduQuickResponse = "/quick-response",
  SeduProjectProposal = "/project-proposal",
  SeduMaterialSearch = "/material-search",
  SeduReportGenerator = "/report-generator",


  //admin pages
  AdminAdmin = "/dashboard/admin/admin/*",
  SeduAdmin = "/dashboard/sedu/admin/*",
  TransportAdmin = "/dashboard/transport/admin/*",
  ProcumentAdmin = "/dashboard/procument/admin/*",
  LibraryAdmin = "/dashboard/library/admin/*",
  CommonAdmin = "/dashboard/common/admin/*",
  Director = "/dashboard/director/admin/*",

  //sub routes of administrator admin
  Employee = "/employee",
  EmployeeType= "/employee-type",
  EmployeeCategory = '/employee-category',
  Designation = '/designations',
  Divisions='/divisions' 
}