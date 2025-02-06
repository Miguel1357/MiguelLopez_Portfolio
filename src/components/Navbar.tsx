import React, { useState, useEffect } from "react";

const Navbar: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [homeSectionHeight, setHomeSectionHeight] = useState<number>(0);
  const [activeSection, setActiveSection] = useState<string>("home"); // Track active section

  useEffect(() => {
    // Set home section height dynamically
    const homeSection = document.getElementById("home-section");
    if (homeSection) {
      setHomeSectionHeight(homeSection.offsetHeight);
    }

    // Detect scroll and toggle visibility based on the scroll position
    const handleScroll = () => {
      if (window.scrollY > homeSectionHeight) {
        setIsVisible(true); // Show navbar after scrolling past home section
      } else {
        setIsVisible(false); // Hide navbar while in home section
      }

      // Update active section based on scroll position
      const sections = ["home", "about", "projects", "skills", "contact"];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(`${section}-section`);
        if (element) {
          const rect = element.getBoundingClientRect();
          return (
            rect.top <= window.innerHeight / 2 &&
            rect.bottom >= window.innerHeight / 2
          );
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    // Add event listener for scroll events
    window.addEventListener("scroll", handleScroll);

    // Cleanup on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [homeSectionHeight]);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth", // Smooth scrolling
        block: "start", // Align to the top of the viewport
      });
    }
  };

  return (
    <nav
      id="navbar"
      className={`w-full bg-[#1a1a1a] text-white py-4 px-8 text-center font-semibold text-lg transition-opacity duration-300 rounded-b-2xl ${
        isVisible ? "opacity-100" : "opacity-0"
      } fixed top-0 left-0 z-50`}
    >
      <div className="flex justify-between items-center flex-wrap">
        <div className="text-left w-full sm:w-auto">
          <h1 className="text-4xl font-bold">Miguel Lopez</h1>
          <h2 className="text-lg font-semibold">Computer Science Graduate</h2>
        </div>
        <ul className="flex space-x-2 sm:space-x-1 mt-4 sm:mt-0 w-full sm:w-auto justify-center sm:justify-start">
          {["home", "about", "projects", "skills", "contact"].map((section) => (
            <li key={section}>
              <button
                onClick={() => scrollToSection(`${section}-section`)}
                className={`px-2 py-2 rounded-md transition-colors duration-200 ${
                  activeSection === section
                    ? "bg-[var(--custom-cyan)] text-white" // Active button
                    : "text-white"
                } hover:bg-[var(--hover-cyan)]`} // Hover effect applied here
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
