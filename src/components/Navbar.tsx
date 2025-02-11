import React, { useState, useEffect } from "react";

const Navbar: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [theme, setTheme] = useState<string>("system"); // "light", "dark", or "system"
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

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

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    setIsDropdownOpen(false); // Close the dropdown after selecting an option
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <nav
      id="navbar"
      className={`w-full bg-[#1a1a1a] text-white py-4 px-6 font-semibold text-lg transition-opacity duration-300 rounded-b-2xl ${
        isVisible ? "opacity-100" : "opacity-0"
      } fixed top-0 left-0 z-50`}
    >
      <div className="flex items-center justify-between w-full">
        {/* Left Side - Section Buttons */}
        <ul className="flex space-x-3">
          {["home", "about", "projects", "contact"].map((section) => (
            <li key={section}>
              <button
                onClick={() => scrollToSection(`${section}-section`)}
                className={`px-3 py-2 rounded-md transition-colors duration-200 ${
                  activeSection === section
                    ? "bg-[var(--custom-cyan)] text-white"
                    : "text-white"
                } hover:bg-[var(--hover-cyan)]`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            </li>
          ))}
        </ul>

        {/* Right Side - Theme Dropdown */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="ml-3 px-3 py-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors duration-200 text-xl"
          >
            🌓
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-gray-800 rounded-lg shadow-lg">
              <button
                onClick={() => handleThemeChange("light")}
                className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700"
              >
                Light
              </button>
              <button
                onClick={() => handleThemeChange("dark")}
                className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700"
              >
                Dark
              </button>
              <button
                onClick={() => handleThemeChange("system")}
                className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700"
              >
                System
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
