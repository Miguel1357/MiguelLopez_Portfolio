import React, { useState, useEffect } from "react";

const titles = ["Software Engineer", "Web Dev", "App Dev", "Game Dev"];

const Home: React.FC = () => {
  const [showCV, setShowCV] = useState<boolean>(false);
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let timeout: number;
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
      className="relative h-screen flex flex-col justify-center items-center text-white overflow-hidden"
    >
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
        <span className="blinking-cursor">|</span> {/* The blinking cursor */}
        seeking to <strong className="text-white">innovate</strong> and{" "}
        <strong className="text-white">redefine</strong>.
      </p>

      {/* Buttons */}
      <div className="flex space-x-4 mt-25 z-10">
        <button
          className={`px-6 py-2 font-semibold rounded-lg shadow-md transition-all duration-300 ${
            showCV
              ? "bg-red-500 text-white hover:bg-red-600 hover:text-gray-200"
              : "bg-white text-[var(--custom-cyan)] hover:bg-[var(--hover-white)] hover:text-[var(--hover-cyan)]"
          }`}
          onClick={() => setShowCV((prev) => !prev)}
        >
          {showCV ? "Close CV" : "View CV"}
        </button>

        <button
          className="px-6 py-2 bg-[var(--custom-cyan)] text-white font-semibold rounded-lg shadow-md hover:bg-[var(--hover-cyan)] transition-all duration-300"
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

      {/* CV Section */}
      <div
        className={`w-3/4 max-w-3xl overflow-hidden transition-all duration-500 ${
          showCV ? "max-h-[600px] opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <iframe
          src="https://drive.google.com/file/d/1c9IxUw43M5cWqD-KmfPa_NGGFv2RfpW8/preview"
          width="100%"
          height="600px"
          className="border-none rounded-lg"
          title="Resume"
        />
      </div>

      <div className="flex space-x-4 mt-6 z-10">
        {/* LinkedIn Button */}
        <a
          href="https://www.linkedin.com/in/migueljlopez02/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-16 h-16 border-2 border-white text-white font-bold text-2xl lowercase transition-all duration-300 hover:bg-white hover:text-black"
        >
          in
        </a>

        {/* GitHub Button */}
        <a
          href="https://github.com/Miguel1357"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-16 h-16 border-2 border-white text-white font-bold text-2xl lowercase transition-all duration-300 hover:bg-white hover:text-black"
        >
          git
        </a>
      </div>

      {/* Tailwind Animations */}
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
