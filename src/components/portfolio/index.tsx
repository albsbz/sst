import Brands from './brands';
import Advantages from './advantages';
import Education from './education';
import Experience from './experience';
import Header from './header';
import PortfolioSection from './portfolioSection';
import Footer from './footer';
import Head from 'next/head';
import Script from 'next/script';

export default function Portfolio() {
	return (
		<>
			<Header />
			<Advantages />
			<PortfolioSection />
			<Education />
			<Experience />
			<Brands />
			<Footer />
		</>
	);
}
