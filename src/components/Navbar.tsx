import React, { useState, useEffect } from "react";

const Navbar: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [homeSectionHeight, setHomeSectionHeight] = useState<number>(0);

  useEffect(() => {
    const homeSection = document.getElementById("home-section");
    if (homeSection) {
      setHomeSectionHeight(homeSection.offsetHeight);
    }

    const handleScroll = () => {
      if (window.scrollY > homeSectionHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [homeSectionHeight]);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      const navbarHeight = document.getElementById("navbar")?.offsetHeight || 0;
      window.scrollTo({
        top: section.offsetTop - navbarHeight, // Adjust scroll position by subtracting navbar height
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <nav
        id="navbar"
        className={`w-full bg-[#1a1a1a] text-white py-4 px-8 text-center font-semibold text-lg transition-opacity duration-300 rounded-b-2xl ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${isVisible ? "fixed top-0 left-0 z-50" : "relative"}`}
      >
        <div className="flex justify-between items-center flex-wrap">
          <div className="text-left w-full sm:w-auto">
            <h1 className="text-4xl font-bold">Miguel Lopez</h1>
            <h2 className="text-lg font-semibold">Computer Science Graduate</h2>
          </div>
          <ul className="flex space-x-2 sm:space-x-1 mt-4 sm:mt-0 w-full sm:w-auto justify-center sm:justify-start">
            {["home", "about", "projects", "skills", "contact"].map(
              (section) => (
                <li key={section}>
                  <button
                    onClick={() => scrollToSection(`${section}-section`)}
                    className="px-2 py-2 rounded-md transition-colors duration-200 hover:bg-[var(--hover-cyan)]"
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                </li>
              )
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
