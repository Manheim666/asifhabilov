import Motion from "../components/Motion";
import { Nav, Hero, About, Marquee, Work, Path, Skills, Contact, Footer } from "../components/Sections";

export default function Page() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <div className="intro" aria-hidden="true"><span className="intro-count">000</span><span className="intro-bar" /></div>
      <div className="progress" aria-hidden="true" />
      <div className="jump-curtain" aria-hidden="true" />
      <div className="cursor" aria-hidden="true" />
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Marquee />
        <Work />
        <Path />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <Motion />
    </>
  );
}
