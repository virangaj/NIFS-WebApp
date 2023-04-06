import React from 'react';
import BackToTop from '../components/shared/BackToTop';
import TailwindNavbar from '../components/shared/TailwindNavbar';
import Footer from '../components/shared/Footer';

function MainPages({ Content }: any) {
	return (
		<>
			<TailwindNavbar />
			<BackToTop />
			<Content />
			<Footer />
		</>
	);
}

export default MainPages;
