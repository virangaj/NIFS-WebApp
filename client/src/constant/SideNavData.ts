import { BiCategoryAlt, BiUserPin } from "react-icons/bi";
import {
  HiOutlineUserGroup,
  HiOutlineOfficeBuilding,
  HiOutlineCurrencyDollar,
  HiOutlineLibrary,
  HiOutlineDatabase,
  HiOutlineClipboardList,
  HiOutlineFolder,
  HiOutlineDocumentText,
} from "react-icons/hi";
import { GiExitDoor, GiIndiaGate, GiNotebook } from "react-icons/gi";
import {
  AiOutlineDollarCircle,
  AiOutlineFundProjectionScreen,
  AiOutlineHome,
  AiOutlineRise,
  AiOutlineSearch,
} from "react-icons/ai";
import {
  RiTimeLine,
  RiUserReceived2Line,
  RiUserStarLine,
} from "react-icons/ri";
import { BsCalendar3Week, BsHammer, BsShieldCheck } from "react-icons/bs";
import { RouteName } from "./routeNames";
import { FaWalking } from "react-icons/fa";

// admin of admin division
export const AdministrationSidenav = [
  {
    title: "Master",
    icon: HiOutlineDatabase,
    subpages: [
      {
        title: "Employees",
        link: RouteName.Employee,
        icon: HiOutlineUserGroup,
      },
      {
        title: "Employee Types",
        link: RouteName.EmployeeType,
        icon: BiUserPin,
      },
      {
        title: "Employees Category",
        link: RouteName.EmployeeCategory,
        icon: BiCategoryAlt,
      },
      {
        title: "Designations",
        link: RouteName.Designation,
        icon: RiUserStarLine,
      },
      {
        title: "Divisions",
        link: RouteName.Divisions,
        icon: HiOutlineOfficeBuilding,
      },
      {
        title: "Funding Sources",
        link: RouteName.FundingSource,
        icon: AiOutlineFundProjectionScreen,
      },
    ],
  },
  {
    title: "Transactions",
    icon: HiOutlineClipboardList,
    subpages: [
      {
        title: "Resignation Request",
        link: RouteName.AdminResignationReq,
        icon: GiExitDoor,
      },
      {
        title: "Contract Extension",
        link: RouteName.ContractExtension,
        icon: HiOutlineDocumentText,
      },
      {
        title: "Accomodation",
        link: RouteName.Accommodation,
        icon: AiOutlineHome,
      },
      {
        title: "Insurance Claim",
        link: RouteName.InsuranceClaims,
        icon: BsShieldCheck,
      },
      {
        title: "Annual Increment Request",
        link: RouteName.AnnualIncrementRequest,
        icon: AiOutlineRise,
      },
    ],
  },
];

//director dashboard
export const DirectorSideNavbar = [
  {
    title: "Master",
    icon: HiOutlineDatabase,
    subpages: [
      {
        title: "Projects",
        link: RouteName.Projects,
        icon: HiOutlineFolder,
      },
      {
        title: "Funding Sources",
        link: RouteName.FundingSource,
        icon: AiOutlineFundProjectionScreen,
      },
    ],
  },
  {
    title: "Transactions",
    icon: HiOutlineClipboardList,
    subpages: [
      {
        title: "Resignation Request",
        link: RouteName.DirectorResignationReq,
        icon: GiExitDoor,
      },
      {
        title: "Contract Extension Request",
        link: RouteName.ContractExtension,
        icon: HiOutlineDocumentText,
      },
      {
        title: "Article Request",
        link: RouteName.LibraryArticleRequest,
        icon: GiExitDoor,
      },
      {
        title: "Journal Request",
        link: RouteName.LibraryArticleRequest,
        icon: HiOutlineDocumentText,
      },
      {
        title: "Travel Request",
        link: RouteName.TransportTravelRequest,
        icon: GiExitDoor,
      },
      {
        title: "Transport Cost",
        link: RouteName.TransportCost,
        icon: HiOutlineCurrencyDollar,
      },

      {
        title: "SRN",
        link: RouteName.Srn,
        icon: RiUserReceived2Line,
      },
      {
        title: "Quotation Request",
        link: RouteName.QuotationRequest,
        icon: GiNotebook,
      },
      {
        title: "Quotation Summary",
        link: RouteName.QuotationSummary,
        icon: HiOutlineDocumentText,
      },
      {
        title: "Gate Pass",
        link: RouteName.GatePass,
        icon: GiIndiaGate,
      },

      // Admin

      {
        title: "Accomodation",
        link: RouteName.Accommodation,
        icon: AiOutlineHome,
      },
      {
        title: "Insurance Claim",
        link: RouteName.InsuranceClaims,
        icon: BsShieldCheck,
      },
      {
        title: "Annual Increment Request",
        link: RouteName.AnnualIncrementRequest,
        icon: AiOutlineRise,
      },

      // common

      {
        title: "Work Request",
        link: RouteName.WorkRequest,
        icon: BsHammer,
      },
      {
        title: "OverTime Request",
        link: RouteName.OverTime,
        icon: RiTimeLine,
      },
      {
        title: "Leave Request",
        link: RouteName.LeaveRequest,
        icon: FaWalking,
      },
      {
        title: "Payment Request",
        link: RouteName.PaymentRequest,
        icon: AiOutlineDollarCircle,
      },
    ],
  },
];

//sedu admin
export const SeduAdminSideNavbar = [
  {
    title: "Master",
    icon: HiOutlineDatabase,
    subpages: [
      {
        title: "Charges",
        link: RouteName.Charges,
        icon: HiOutlineCurrencyDollar,
      },
      {
        title: "Facilities",
        link: RouteName.Facilities,
        icon: HiOutlineOfficeBuilding,
      },
      {
        title: "All Venues",
        link: RouteName.VenueMaster,
        icon: HiOutlineLibrary,
      },
      {
        title: "Projects",
        link: RouteName.Projects,
        icon: HiOutlineFolder,
      },
      {
        title: "Funding Sources",
        link: RouteName.FundingSource,
        icon: AiOutlineFundProjectionScreen,
      },
    ],
  },
  {
    title: "Transactions",
    icon: HiOutlineClipboardList,
    subpages: [
      {
        title: "Resignation Request",
        link: RouteName.AdminResignationReq,
        icon: GiExitDoor,
      },
      {
        title: "Contract Extension",
        link: RouteName.ContractExtension,
        icon: HiOutlineDocumentText,
      },
      {
        title: "Event Requests",
        link: RouteName.SeduEventRequest,
        icon: BsCalendar3Week,
      },
    ],
  },
];

//HOD dashboard
export const HODSideNavbar = [
  {
    title: "Master",
    icon: HiOutlineDatabase,
    subpages: [
      {
        title: "Projects",
        link: RouteName.Projects,
        icon: HiOutlineFolder,
      },
      {
        title: "Funding Sources",
        link: RouteName.FundingSource,
        icon: AiOutlineFundProjectionScreen,
      },
    ],
  },
  {
    title: "Transactions",
    icon: HiOutlineClipboardList,
    subpages: [
      {
        title: "Resignation Request",
        link: RouteName.AdminResignationReq,
        icon: GiExitDoor,
      },
      {
        title: "Contract Extension",
        link: RouteName.ContractExtension,
        icon: HiOutlineDocumentText,
      },
      {
        title: "Travel Request",
        link: RouteName.TransportTravelRequest,
        icon: GiExitDoor,
      },
      {
        title: "Transport Cost",
        link: RouteName.TransportCost,
        icon: HiOutlineCurrencyDollar,
      },
      {
        title: "Article Request",
        link: RouteName.LibraryArticleRequest,
        icon: GiExitDoor,
      },
      {
        title: "Journal Request",
        link: RouteName.LibraryJournalRequest,
        icon: HiOutlineDocumentText,
      },

      {
        title: "Gate Pass",
        link: RouteName.GatePass,
        icon: GiIndiaGate,
      },
      {
        title: "Quotation Request",
        link: RouteName.QuotationRequest,
        icon: GiNotebook,
      },
      {
        title: "Quotation Summary",
        link: RouteName.QuotationSummary,
        icon: HiOutlineDocumentText,
      },
      {
        title: "SRN",
        link: RouteName.Srn,
        icon: RiUserReceived2Line,
      },
      // Admin
      {
        title: "Accomodation",
        link: RouteName.Accommodation,
        icon: AiOutlineHome,
      },
      {
        title: "Insurance",
        link: RouteName.InsuranceClaims,
        icon: BsShieldCheck,
      },
      {
        title: "Annual Increment Request",
        link: RouteName.AnnualIncrementRequest,
        icon: AiOutlineRise,
      },

      // common

      {
        title: "Work Request",
        link: RouteName.WorkRequest,
        icon: BsHammer,
      },
      {
        title: "OverTime Request",
        link: RouteName.OverTime,
        icon: RiTimeLine,
      },
      {
        title: "Leave Request",
        link: RouteName.LeaveRequest,
        icon: FaWalking,
      },
      {
        title: "Payment Request",
        link: RouteName.PaymentRequest,
        icon: AiOutlineDollarCircle,
      },
    ],
  },
];

// transport Dashboard
export const TransportSideNavbar = [
  {
    title: "Master",
    icon: HiOutlineDatabase,
    subpages: [
      {
        title: "Projects",
        link: RouteName.Projects,
        icon: HiOutlineFolder,
      },
      {
        title: "Funding Sources",
        link: RouteName.FundingSource,
        icon: AiOutlineFundProjectionScreen,
      },
    ],
  },
  {
    title: "Transactions",
    icon: HiOutlineClipboardList,
    subpages: [
      {
        title: "Travel Request",
        link: RouteName.TransportTravelRequest,
        icon: GiExitDoor,
      },
      {
        title: "Transport Cost",
        link: RouteName.TransportCost,
        icon: HiOutlineCurrencyDollar,
      },
    ],
  },
];

// Procument Dashboard
export const ProcumentSideBar = [
  {
    title: "Master",
    icon: HiOutlineDatabase,
    subpages: [
      {
        title: "Projects",
        link: RouteName.Projects,
        icon: HiOutlineFolder,
      },
      {
        title: "Funding Sources",
        link: RouteName.FundingSource,
        icon: AiOutlineFundProjectionScreen,
      },
    ],
  },
  {
    title: "Transactions",
    icon: HiOutlineClipboardList,
    subpages: [
      {
        title: "SRN",
        link: RouteName.Srn,
        icon: RiUserReceived2Line,
      },
      {
        title: "Gate Pass",
        link: RouteName.GatePass,
        icon: GiIndiaGate,
      },
      {
        title: "Quotation Request",
        link: RouteName.QuotationRequest,
        icon: GiNotebook,
      },
      {
        title: "Quotation Summary",
        link: RouteName.QuotationSummary,
        icon: HiOutlineDocumentText,
      },
    ],
  },
];

// Library Dashboard
export const LibrarySideBar = [
  {
    title: "Master",
    icon: HiOutlineDatabase,
    subpages: [
      {
        title: "Projects",
        link: RouteName.Projects,
        icon: HiOutlineFolder,
      },
      {
        title: "Funding Sources",
        link: RouteName.FundingSource,
        icon: AiOutlineFundProjectionScreen,
      },
    ],
  },
  {
    title: "Transactions",
    icon: HiOutlineClipboardList,
    subpages: [
      {
        title: "Article Request",
        link: RouteName.LibraryArticleRequest,
        icon: GiExitDoor,
      },
      {
        title: "Journal Request",
        link: RouteName.LibraryJournalRequest,
        icon: HiOutlineDocumentText,
      },
    ],
  },
];
