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
      <Home />
      <div className="relative">
        <Navbar />
        <FadeIn fadeInThreshold={0.5} fadeOutThreshold={0.5} fadeDuration={0.5}>
          <About />
        </FadeIn>
        <GeneralAnimation className="general-animation-container" />{" "}
        <FadeIn fadeInThreshold={0.5} fadeOutThreshold={0.5} fadeDuration={0.5}>
          <Projects />
        </FadeIn>
        <FadeIn fadeInThreshold={0.5} fadeOutThreshold={0.5} fadeDuration={0.5}>
          <Contact />
        </FadeIn>
      </div>

      {/* Up Arrow/Back to home button */}
      <div className="relative flex justify-center">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`absolute bottom-[-24px] p-3 rounded-full transition-all duration-300 ease-in-out 
    ${
      isHovered
        ? "animate-bounce-hover hover:bg-[var(--hover-cyan)]"
        : "bg-[var(--custom-cyan)]"
    }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8"
          >
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default App;
