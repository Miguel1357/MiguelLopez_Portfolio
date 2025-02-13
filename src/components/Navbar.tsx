import React, { useState, useEffect } from "react";

const Navbar: React.FC = () => {
  // State to control navbar visibility based on scroll position
  const [isVisible, setIsVisible] = useState<boolean>(false);
  // State to track the currently active section based on scroll position
  const [activeSection, setActiveSection] = useState<string>("home");

  useEffect(() => {
    const handleScroll = () => {
      const homeSection = document.getElementById("home-section");
      const homeSectionHeight = homeSection ? homeSection.offsetHeight : 0;

      setIsVisible(window.scrollY > homeSectionHeight * 0.5);

      const sections = ["home", "about", "projects", "contact"];
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

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav
      id="navbar"
      className={`w-full bg-[#1a1a1a] py-4 px-6 font-semibold text-lg transition-opacity duration-300 rounded-b-2xl ${
        isVisible
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } fixed top-0 left-0 z-50`}
    >
      <div className="flex items-center justify-between w-full">
        <ul className="flex space-x-3">
          {["home", "about", "projects", "contact"].map((section) => (
            <li key={section}>
              <button
                onClick={() => scrollToSection(`${section}-section`)}
                className={`px-3 py-2 rounded-md transition-colors duration-200 ${
                  activeSection === section
                    ? "bg-[var(--custom-cyan)]"
                    : "text-white"
                } hover:bg-[var(--hover-cyan)]`}
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
