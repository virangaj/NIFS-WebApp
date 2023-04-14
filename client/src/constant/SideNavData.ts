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
import { AiOutlineFundProjectionScreen, AiOutlineSearch } from "react-icons/ai";
import { RiUserReceived2Line, RiUserStarLine } from "react-icons/ri";
import { RouteName } from "./routeNames";

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
