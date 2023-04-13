import { useEffect, useState } from 'react';
import TextBoxLabel from './TextBoxLabel';
import FundingSourceService from '../../services/common/FundingSourceService';

function FundingSourceSelector({ onChange, value, name }: any) {
	const [fundingSource, setFundingSource] = useState<Array<any>>([]);

	useEffect(() => {
		retreiveFundingSource();
	}, []);

	//get all locations
	const retreiveFundingSource = () => {
		FundingSourceService.getAllFundingServices().then((res) => {
			setFundingSource(res.data);
		});
	};
	return (
		<div>
			<TextBoxLabel name='Select Funding Source' />
			<select
				className='tailwind-text-box'
				onChange={onChange}
				value={value}
				name={name}
			>
				<option value='' disabled>
					Select Funding Source
				</option>

				{fundingSource &&
					fundingSource.map((f: any, i: number) => (
						<option value={f.fundingId} key={i}>
							{f.name}
						</option>
					))}
			</select>
		</div>
	);
}

export default FundingSourceSelector;
