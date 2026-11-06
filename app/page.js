import Hero from "../components/Hero";
import Work from "../components/Work";
import { About, Path, Skills, Contact, Footer, Nav } from "../components/Sections";

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Work />
        <Path />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
