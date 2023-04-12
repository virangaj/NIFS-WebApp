import { useState } from 'react';
import AddProjects from './AddProjects';
import ViewProjects from './ViewProjects';
import { HiOutlineDocumentDuplicate } from 'react-icons/hi';
import { AiOutlineUpload } from 'react-icons/ai';
const tabs = [
	{ label: 'Create a Project', icon: AiOutlineUpload },
	{ label: 'View All Project', icon: HiOutlineDocumentDuplicate },
];

function Projects() {
	const [activeTab, setActiveTab] = useState(0);
	return (
		<>
			<div className='admin-page-title'>
				<p>Projects</p>

				<hr className='admin-horizontal-line' />
			</div>
			<div className='admin-tab-menu'>
				<div className='flex justify-center pt-2'>
					{tabs.map((tab, index) => (
						<button
							key={index}
							className={`py-2 px-4 mx-4 flex items-center ${
								activeTab === index
									? 'text-blue-500 border-b-2 font-bold border-blue-500'
									: 'text-black'
							}  hover:text-blue-500 focus:outline-none`}
							onClick={() => setActiveTab(index)}
						>
							<tab.icon className='w-5 h-5 mr-2' />
							{tab.label}
						</button>
					))}
				</div>
				<div className='p-4 mt-4'>
					{activeTab === 0 ? <AddProjects /> : <ViewProjects />}
				</div>
			</div>
		</>
	);
}

export default Projects;
