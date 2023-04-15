import Pages from '../components/data/MainNavPages.json';
import { Link } from 'react-router-dom';
import HomeMainNavCard from '../components/HomeMainNavCard';

function Home() {
	return (
		<div className='flex items-center justify-center h-[750px] body-content'>
			{Pages.map((p, i) => (
				<Link to={p.link} key={i}>
					<HomeMainNavCard title={p.title} img={p.img} />
				</Link>
			))}
		</div>
	);
}

export default Home;
