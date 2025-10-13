import Home from './components/pages/shared/Home';
import About from './components/pages/shared/About';
import Navbar from './components/layout/Navbar';
import Services from './components/pages/shared/services';
import Statistics from './components/pages/shared/statistics';
import ContactUs from './components/pages/shared/contact';
import Footer from './components/layout/footer';
import SiteHero from './components/pages/shared/hero';


const MainPage = () => {
  return (
    <div>
        <Navbar />
       <br /> 
      <Home />
      <About />
            <SiteHero />

      <Services />
            <Statistics />
      <ContactUs />

      <Footer />

    </div>
  );
};

export default MainPage;