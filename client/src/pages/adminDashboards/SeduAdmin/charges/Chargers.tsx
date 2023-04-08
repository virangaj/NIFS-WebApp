import CreateCharge from './CreateCharge';
import InsideAdminPages from '../../../../layout/InsideAdminPages';
import ChargeTable from './ChargeTable';

function Chargers() {
	return (
		<>
			<InsideAdminPages
				Form={CreateCharge}
				formHeading={'Add New Charge'}
				tableHeading={'All Charges'}
				title={'Charges for Venues'}
				Table={ChargeTable}
			/>
		</>
	);
}

export default Chargers;
