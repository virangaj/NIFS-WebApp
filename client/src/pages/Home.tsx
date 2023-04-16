import { Link } from 'react-router-dom';
import HomeMainNavCard from '../components/HomeMainNavCard';
import Pages from '../components/data/MainNavPages.json';
import Circle from '../images/dots_circle_b.png';

function Home() {
	return (
		<div className='flex items-center justify-center h-[750px] body-content overflow-hidden relative flex-wrap'>
			{/* <img src={Circle} className='absolute -right-[250px] -top-28' /> */}
			{Pages.map((p, i) => (
				<Link to={p.link} key={i}>
					<HomeMainNavCard title={p.title} img={p.img} />
				</Link>
			))}
		</div>
	);
}

export default Home;
