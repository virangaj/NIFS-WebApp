import React from 'react';

function TailwindTab({ tabs, activeTab, setActiveTab }: any) {
	return (
		<>
			<div className='flex justify-center pt-2'>
				{tabs.map((tab: any, index: number) => (
					<button
						key={index}
						className={`py-2 px-4 mx-4 flex items-center ${
							activeTab === index
								? 'text-blue-500 border-b-2 font-bold border-blue-500'
								: 'text-black'
						}  hover:text-blue-500 focus:outline-none`}
						onClick={() => setActiveTab(index)}
					>
						<tab.icon className='w-6 h-6 mr-2' />
						{tab.label}
					</button>
				))}
			</div>
		</>
	);
}

export default TailwindTab;
