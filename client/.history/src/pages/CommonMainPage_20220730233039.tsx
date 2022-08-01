import React from 'react';
import SecondaryNavbar from '../components/shared/SecondaryNavbar';
import Pages from '../components/data/CommonNavData.json'
import VerticalSecondaryNavbar from '../components/shared/VerticalSecondaryNavbar';
function CommonMainPage() {
	return < div className="body-position" >
		{/* <SeduSecondaryNavbar /> */}
		{/* <SecondaryNavbar pages={Pages} /> */}
		{/* <div className="main-content"> */}
		<div className='secondary-nav-position'>
			<VerticalSecondaryNavbar pages={Pages} />
		</div>
		{/* <SecondaryNavbar pages={Pages} /> */}
	</div>;
}

export default CommonMainPage;
