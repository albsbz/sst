import Brands from './brands';
import Advantages from './advantages';
import Education from './education';
import Experience from './experience';
import Header from './header';
import PortfolioSection from './portfolioSection';
import Footer from './footer';
import Head from 'next/head';
import Script from 'next/script';
import AppStars from './appStars/appStars';

export default function Portfolio() {
	return (
		<>
			<AppStars className="fixed w-full h-full bg-slate-200 left-0 top-0 -z-10" />
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
