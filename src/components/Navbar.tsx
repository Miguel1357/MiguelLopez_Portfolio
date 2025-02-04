import React, { useState, useEffect } from "react";

const Navbar: React.FC = () => {
  const [navbarAtTop, setNavbarAtTop] = useState<boolean>(false);
  const [navbarHeight, setNavbarHeight] = useState<number>(0);

  useEffect(() => {
    const navbar = document.getElementById("navbar");
    if (navbar) {
      setNavbarHeight(navbar.offsetHeight); // Store the height of the navbar
    }

    const handleScroll = () => {
      const homeHeight =
        document.getElementById("home-section")?.offsetHeight || 0;
      setNavbarAtTop(window.scrollY >= homeHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to smoothly scroll to sections
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Spacer to prevent layout shift */}
      {navbarAtTop && <div style={{ height: `${navbarHeight}px` }}></div>}

      <nav
        id="navbar"
        className={`w-full bg-[#1a1a1a] text-white py-4 px-8 text-center font-semibold text-lg transition-all duration-300 rounded-b-2xl ${
          navbarAtTop ? "fixed top-0 left-0 shadow-lg z-50" : "relative"
        }`}
      >
        <div className="flex justify-between items-center flex-wrap">
          {/* Left side: Your name and title */}
          <div className="text-left w-full sm:w-auto">
            <h1 className="text-4xl font-bold">Miguel Lopez</h1>
            <h2 className="text-lg font-semibold">Computer Science Graduate</h2>
          </div>

          {/* Right side: Navigation links */}
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
