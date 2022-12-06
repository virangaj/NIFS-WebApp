import React from 'react';
import SecondaryNavbar from '../components/shared/SecondaryNavbar';
import Pages from '../components/data/AdminNavData.json'

import Dots from '../images/dots_circle_b.png'

function AdminMainPage() {
	return <div className="body-content" >
		{/* <SeduSecondaryNavbar /> */}
		<SecondaryNavbar pages={Pages} />


	</div>;
}

export default AdminMainPage;
