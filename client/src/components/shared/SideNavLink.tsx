import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiPlus, HiMinus } from 'react-icons/hi';
function SideNavLink({ navData, Route }: any) {
	const location: any = useLocation();
	const [togglePage, setTogglePage] = useState<boolean>(false);
	return (
		<>
			{!(navData.subpages?.length > 0) ? (
				<Link to={navData.link}>
					<p
						className={
							location.pathname === `/dashboard/${Route}/admin${navData.link}`
								? 'admin-sidebar-text-active'
								: 'admin-sidebar-text'
						}
					>
						<navData.icon className='w-5 h-5' />{' '}
						<span className='ml-4'>{navData.title}</span>
					</p>
				</Link>
			) : (
				<ul className='relative'>
					<button
						className={
							location.pathname === `/dashboard/${Route}/admin`
								? 'admin-sidebar-text-active py-1'
								: 'admin-sidebar-text py-1'
						}
						onClick={() => setTogglePage((val: boolean) => !val)}
						aria-haspopup='true'
					>
						<navData.icon className='w-5 h-5' />{' '}
						<span className='mx-4'>{navData.title}</span>
						{togglePage ? <HiMinus /> : <HiPlus />}
					</button>
					{togglePage ? (
						<div>
							<ul className='px-2 mt-2 rounded-lg overflow-hidde bg-slate-100'>
								{navData.subpages.map((sub: any, i: number) => (
									<Link to={`/dashboard/${Route}/admin${sub.link}`}>
										<li
											className={
												location.pathname ===
												`/dashboard/${Route}/admin${sub.link}`
													? 'admin-sidebar-text-active !text-sm py-2 '
													: 'admin-sidebar-text !text-sm py-2'
											}
										>
											<sub.icon className='w-5 h-5' />{' '}
											<span className='ml-4'>{sub.title}</span>
										</li>
									</Link>
								))}
							</ul>
						</div>
					) : (
						<></>
					)}
				</ul>
			)}
		</>
	);
}

export default SideNavLink;
