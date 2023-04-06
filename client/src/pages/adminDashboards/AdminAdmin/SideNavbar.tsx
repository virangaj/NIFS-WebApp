import React from 'react';
import { BiCategoryAlt, BiUserPin } from 'react-icons/bi';
import { HiOutlineUserGroup, HiOutlineOfficeBuilding } from 'react-icons/hi';
import { RiUserStarLine } from 'react-icons/ri';
import { Link, useLocation } from 'react-router-dom';
import { RouteName } from '../../../constant/routeNames';

const navdata = [
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

function SideNavbar() {
	const location: any = useLocation();
	console.log(location.pathname);

	return (
		<aside className='admin-side-nav'>
			<div className='py-2 text-gray-500'>
				<ul className='mt-3'>
					{navdata.map((data: any, i: number) => (
						<li className='relative px-6 py-3' key={i}>
							<span
								className={
									location.pathname === `/dashboard/admin/admin${data.link}`
										? 'active-admin-panel-marker'
										: 'admin-panel-marker'
								}
								aria-hidden='true'
							></span>
							<Link to={`/dashboard/admin/admin${data.link}`}>
								<p
									className={
										location.pathname === `/dashboard/admin/admin${data.link}`
											? 'admin-sidebar-text-active'
											: 'admin-sidebar-text'
									}
								>
									<data.icon className='w-5 h-5' />
									<span className='ml-4'>{data.title}</span>
								</p>
							</Link>
						</li>
					))}
				</ul>
			</div>
		</aside>
	);
}

export default SideNavbar;
