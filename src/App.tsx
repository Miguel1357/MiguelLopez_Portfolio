import FadeIn from "./components/FadeIn";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      {/* Home Section (No fade-in, always visible) */}
      <Home />
      <Navbar />
      {/* Buffer Section */}
      <div style={{ height: "1500px" }}></div> {/* Adjust height as needed */}
      {/* About fades in after buffer */}
      <FadeIn fadeInThreshold={0.7} fadeOutThreshold={0.7} fadeDuration={0.6}>
        <About />
      </FadeIn>
      {/* Other Sections */}
      <FadeIn fadeInThreshold={0.5} fadeOutThreshold={0.7} fadeDuration={0.5}>
        <Projects />
      </FadeIn>
      <FadeIn fadeInThreshold={0.5} fadeOutThreshold={0.7} fadeDuration={0.5}>
        <Skills />
      </FadeIn>
      <FadeIn fadeInThreshold={0.5} fadeOutThreshold={0.7} fadeDuration={0.5}>
        <Contact />
      </FadeIn>
      <Footer />
    </div>
  );
}

export default App;
