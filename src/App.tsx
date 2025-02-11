import FadeIn from "./components/FadeIn";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import GeneralAnimation from "./animations/GeneralAnimation";
import { useState } from "react";

function App() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative">
      {/* Home Section (No animation in background here) */}
      <Home />

      {/* General Animation is added in other sections */}
      <div className="relative">
        <Navbar />
        {/* FadeIn sections */}
        <FadeIn fadeInThreshold={0.7} fadeOutThreshold={0.7} fadeDuration={0.6}>
          <About />
        </FadeIn>
        <GeneralAnimation className="general-animation-container" />{" "}
        <FadeIn fadeInThreshold={0.5} fadeOutThreshold={0.7} fadeDuration={0.5}>
          <Projects />
        </FadeIn>
        <FadeIn fadeInThreshold={0.5} fadeOutThreshold={0.7} fadeDuration={0.5}>
          <Contact />
        </FadeIn>
      </div>

      <div className="relative flex justify-center">
        {/* Scroll to Top Button Positioned Between Contact & Footer */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`absolute bottom-[-24px] text-white p-3 rounded-full transition-all duration-300 ease-in-out 
    ${
      isHovered
        ? "animate-bounce-hover hover:bg-[var(--hover-cyan)]"
        : "bg-[var(--custom-cyan)]"
    }`}
        >
          ↑
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default App;
