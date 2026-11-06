import Nav from "../components/Nav";
import Hero from "../components/Hero";
import Ticker from "../components/Ticker";
import Work from "../components/Work";
import Tools from "../components/Tools";
import CvViewer from "../components/CvViewer";
import { About, Path, Contact, Footer } from "../components/Sections";

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <Work />
        <About />
        <Path />
        <Tools />
        <Contact />
      </main>
      <Footer />
      <CvViewer />
    </>
  );
}
