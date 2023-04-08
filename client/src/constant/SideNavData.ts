import { BiCategoryAlt, BiUserPin } from 'react-icons/bi';
import { HiOutlineUserGroup, HiOutlineOfficeBuilding } from 'react-icons/hi';
import { RiUserStarLine } from 'react-icons/ri';
import { RouteName } from './routeNames';

export const AdministrationSidenav = [
	{
		title: 'Employees',
		link: RouteName.Employee,
		icon: HiOutlineUserGroup,
	},
	{
		title: 'Employee Types',
		link: RouteName.EmployeeType,
		icon: BiUserPin,
	},
	{
		title: 'Employees Category',
		link: RouteName.EmployeeCategory,
		icon: BiCategoryAlt,
	},
	{
		title: 'Designations',
		link: RouteName.Designation,
		icon: RiUserStarLine,
	},
	{
		title: 'Divisions',
		link: RouteName.Divisions,
		icon: HiOutlineOfficeBuilding,
	},
	{
		title: 'Resignation Request',
		link: RouteName.AdminResignationReq,
		icon: HiOutlineOfficeBuilding,
	},
];

export const DirectorSideNavbar = [
	{
		title: 'Resignation Request',
		link: RouteName.DirectorResignationReq,
		icon: HiOutlineOfficeBuilding,
	},
];

export const SeduAdminSideNavbar = [
	{
		title: 'Charges',
		link: RouteName.Charges,
		icon: HiOutlineOfficeBuilding,
	},
	{
		title: 'Facilities',
		link: RouteName.Facilities,
		icon: HiOutlineOfficeBuilding,
	},
];
