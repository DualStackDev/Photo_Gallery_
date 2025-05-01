import HomeNavbar from "../components/HomeNavbar";
import MainHero from "../components/MainHero";
import PhotoSection from "../components/PhotoSection";
import ContactSection from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div>
      <HomeNavbar></HomeNavbar>
      <MainHero></MainHero>
      <PhotoSection></PhotoSection>
      <ContactSection></ContactSection>
      <Footer></Footer>
    </div>
  );
}
