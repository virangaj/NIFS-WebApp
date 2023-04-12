import { Link, useLocation } from 'react-router-dom';
import SideNavLink from '../../../components/shared/SideNavLink';

function SideNavbar({ navdata, Route }: any) {
	const location: any = useLocation();
	console.log(location.pathname);

	return (
		<aside className='admin-side-nav'>
			<div className='py-2 text-gray-500'>
				<ul className='mt-3'>
					{navdata?.map((data: any, i: number) => (
						<li className='relative px-6 py-3' key={i}>
							<SideNavLink Route={Route} navData={data} />
						</li>
					))}
				</ul>
			</div>
		</aside>
	);
}

export default SideNavbar;
