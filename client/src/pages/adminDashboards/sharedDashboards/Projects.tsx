import { useState } from 'react';
import AddProjects from './AddProjects';
import ViewProjects from './ViewProjects';
import { HiOutlineDocumentDuplicate } from 'react-icons/hi';
import { AiOutlineUpload } from 'react-icons/ai';
import TailwindTab from '../../../components/TailwindTab';
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
				<TailwindTab
					tabs={tabs}
					activeTab={activeTab}
					setActiveTab={setActiveTab}
				/>
				<div className='p-4 mt-4'>
					{activeTab === 0 ? <AddProjects /> : <ViewProjects />}
				</div>
			</div>
		</>
	);
}

export default Projects;
