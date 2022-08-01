import React from 'react';
import SecondaryNavbar from '../components/shared/SecondaryNavbar';
import Pages from '../components/data/CommonNavData.json'
function CommonMainPage() {
	return <div className="body-content">
		<SecondaryNavbar pages={Pages} />
	</div>;
}

export default CommonMainPage;
