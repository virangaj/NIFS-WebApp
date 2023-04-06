import SecondaryNavbar from '../components/shared/SecondaryNavbar';
import Dots from '../images/dots_circle_b.png';

function ContentPage({ Pages, Content }: any) {
	return (
		<div className='body-content min-h-[80vh]'>
			{/* <SeduSecondaryNavbar /> */}

			<SecondaryNavbar pages={Pages} />
			<div className='fixed w-[400px] top-[-100px] right-[-100px] -z-10'>
				<img src={Dots} alt='Dots' />
			</div>

			<Content />
		</div>
	);
}

export default ContentPage;
