import { useEffect, useState } from 'react';
import TextBoxLabel from './TextBoxLabel';
import ProjectService from '../../services/common/ProjectService';

function ProjectSelector({ onChange, value, name }: any) {
	const [projects, setProjects] = useState<Array<any>>([]);

	useEffect(() => {
		retreiveProjets();
	}, []);

	//get all locations
	const retreiveProjets = () => {
		ProjectService.getAllProjects().then((res) => {
			console.log(res);
			setProjects(res.data);
		});
	};
	return (
		<div>
			<TextBoxLabel name='Select Project' />
			<select
				className='tailwind-text-box'
				onChange={onChange}
				value={value}
				name={name}
			>
				<option value='' disabled>
					Select Project
				</option>

				{projects &&
					projects.map((p: any, i: number) => (
						<option value={p.projectId} key={i}>
							{p.projectName}
						</option>
					))}
			</select>
		</div>
	);
}

export default ProjectSelector;
