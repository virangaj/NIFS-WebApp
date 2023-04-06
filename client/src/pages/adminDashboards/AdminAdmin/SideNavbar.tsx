import { Link, useLocation } from 'react-router-dom';

function SideNavbar({ navdata }: any) {
	const location: any = useLocation();
	console.log(location.pathname);

	return (
		<aside className='admin-side-nav'>
			<div className='py-2 text-gray-500'>
				<ul className='mt-3'>
					{navdata?.map((data: any, i: number) => (
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
