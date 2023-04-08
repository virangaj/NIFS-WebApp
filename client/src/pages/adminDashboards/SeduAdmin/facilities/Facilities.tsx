import InsideAdminPages from '../../../../layout/InsideAdminPages';
import CreateFacility from './CreateFacility';
import FacilityTable from './FacilityTable';

function Facilities() {
	return (
		<>
			<InsideAdminPages
				Form={CreateFacility}
				formHeading={'Add New Facility'}
				tableHeading={'All Facilities'}
				title={'Facilities for Venues'}
				Table={FacilityTable}
			/>
		</>
	);
}

export default Facilities;
