import React, { useState } from "react";

const Home: React.FC = () => {
  const [showCV, setShowCV] = useState<boolean>(false);

  return (
    <section
      id="home-section"
      className="relative h-screen flex flex-col justify-center items-center bg-gray-900 text-white overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <svg
          className="absolute w-full h-full animate-waves"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <defs>
            <linearGradient
              id="waveGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#ffffff0f" />
              <stop offset="100%" stopColor="#ffffff04" />
            </linearGradient>
          </defs>
          <path
            fill="url(#waveGradient)"
            fillOpacity="1"
            d="M0,160L60,154.7C120,149,240,139,360,160C480,181,600,235,720,234.7C840,235,960,181,1080,160C1200,139,1320,149,1380,154.7L1440,160V320H1380C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320H0Z"
          />
        </svg>
      </div>

      {/* Foreground Content */}
      <p className="text-center z-10">Greetings! I am</p>
      <header>
        <h1 className="text-4xl font-bold text-center z-10">Miguel Lopez</h1>
      </header>
      <p className="text-center z-10">
        <strong>Web dev</strong> seeking to <strong>innovate</strong> and{" "}
        <strong>redefine.</strong>
      </p>

      {/* Buttons */}
      <div className="flex space-x-4 mt-6 z-10">
        <button
          className={`px-6 py-2 font-semibold rounded-lg shadow-md transition-all duration-300 ${
            showCV
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-white text-cyan-500 hover:bg-gray-100"
          }`}
          onClick={() => setShowCV((prev) => !prev)}
        >
          {showCV ? "Close CV" : "View CV"}
        </button>

        <button
          className="px-6 py-2 bg-cyan-500 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-600 transition-all duration-300"
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
          src="/MiguelJLopez_Resume.pdf"
          width="100%"
          height="600px"
          className="border-none rounded-lg"
          title="Resume"
        />
      </div>

      {/* Tailwind Animation */}
      <style>
        {`
          @keyframes waveMotion {
            0% { transform: translateX(0px); }
            50% { transform: translateX(20px); }
            100% { transform: translateX(0px); }
          }
          .animate-waves {
            animation: waveMotion 6s infinite ease-in-out;
          }
        `}
      </style>
    </section>
  );
};

export default Home;
