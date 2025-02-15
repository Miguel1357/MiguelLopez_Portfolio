import React, { useState, useEffect } from "react";
import HomeAnimation from "../animations/HomeAnimation";

const titles = ["Software Engineer", "Web Dev", "App Dev", "Game Dev"];

const Home: React.FC = () => {
  const [showCV, setShowCV] = useState<boolean>(false);
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [typing, setTyping] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);

    let timeout: ReturnType<typeof setTimeout>;
    const currentTitle = titles[currentTitleIndex];
    const textLength = displayedText.length;

    if (typing) {
      if (textLength < currentTitle.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentTitle.substring(0, textLength + 1));
        }, 100);
      } else {
        setTimeout(() => setTyping(false), 1000);
      }
    } else {
      if (textLength > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(currentTitle.substring(0, textLength - 1));
        }, 50);
      } else {
        setTyping(true);
        setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, typing, currentTitleIndex]);

  return (
    <section
      id="home-section"
      className={`relative min-h-screen flex flex-col justify-center items-center overflow-hidden transition-opacity duration-1000 ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      <HomeAnimation />
      <p className="text-center text-[var(--gray-text)] z-10">
        Greetings! I am
      </p>
      <header>
        <h1 className="text-6xl font-bold text-center z-10 mt-3">
          Miguel Lopez
        </h1>
      </header>
      <p className="text-center text-[var(--gray-text)] z-10 mt-6">
        <strong className="text-white">{displayedText}</strong>
        <span className="blinking-cursor">|</span> seeking to{" "}
        <strong className="text-white">innovate</strong> and{" "}
        <strong className="text-white">redefine.</strong>
      </p>
      <div className="flex space-x-4 mt-20 z-10">
        <button
          className={`px-6 py-2 font-semibold rounded-lg shadow-md transition-all duration-300 ${
            showCV
              ? "bg-red-500 hover:bg-red-600 hover:text-gray-200"
              : "bg-white text-[var(--custom-cyan)] hover:bg-[var(--hover-white)] hover:text-[var(--hover-cyan)]"
          }`}
          onClick={() => setShowCV((prev) => !prev)}
        >
          {showCV ? "Close CV" : "View CV"}
        </button>

        <button
          className="px-6 py-2 bg-[var(--custom-cyan)] font-semibold rounded-lg shadow-md hover:bg-[var(--hover-cyan)] transition-all duration-300"
          onClick={() => {
            const contactSection = document.getElementById("contact-section");
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          Contact Me
        </button>
      </div>
      {showCV && (
        <div className="mt-4 z-10">
          <a
            href="./MiguelJLopez_Resume.pdf"
            download="MiguelJLopez_Resume.pdf"
            className="px-6 py-2 bg-white text-[var(--custom-cyan)] font-semibold rounded-lg shadow-md hover:bg-[var(--hover-white)] hover:text-[var(--hover-cyan)] transition-all duration-300"
          >
            Download CV
          </a>
        </div>
      )}

      {/* CV Section */}
      <div
        className={`w-full max-w-3xl overflow-hidden transition-all duration-500 flex-grow ${
          showCV
            ? "max-h-[calc(100vh-4rem)] opacity-100 mt-4"
            : "max-h-0 opacity-0"
        }`}
      >
        {/* PDF Viewer */}
        <div className="w-full rounded-lg min-h-[600px] max-h-[90vh] overflow-auto">
          <iframe
            src="./MiguelJLopez_Resume.pdf"
            className="border-none w-full min-h-[600px] h-[calc(90vh-4rem)]"
            title="Resume"
          />
        </div>
      </div>

      <div className="flex space-x-4 mt-6 z-10">
        <a
          href="https://www.linkedin.com/in/migueljlopez02/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-16 h-16 border-2 border-white font-bold text-2xl lowercase transition-all duration-300 hover:bg-white hover:text-black"
        >
          in
        </a>

        <a
          href="https://github.com/Miguel1357"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-16 h-16 border-2 border-white font-bold text-2xl lowercase transition-all duration-300 hover:bg-white hover:text-black"
        >
          git
        </a>
      </div>

      <div className="absolute bottom-6 flex flex-col items-center z-10">
        <button
          className="nav-button animate-fade"
          onClick={() => {
            const aboutSection = document.getElementById("about-section");
            if (aboutSection) {
              aboutSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          About
          <span className="text-2xl mt-1">&#x25BC;</span> {/* Downward arrow */}
        </button>
      </div>

      {/* Typing Animation Styling */}
      <style>
        {`
          @keyframes blink {
            50% { opacity: 0; }
          }
          .blinking-cursor {
            display: inline-block;
            font-weight: bold;
            color: white;
            animation: blink 1s infinite;
          }
        `}
      </style>
    </section>
  );
};

export default Home;
