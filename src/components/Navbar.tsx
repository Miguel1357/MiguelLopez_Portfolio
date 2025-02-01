import React, { useState, useEffect } from "react";

const Navbar: React.FC = () => {
  const [navbarAtTop, setNavbarAtTop] = useState<boolean>(false);

  useEffect(() => {
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
    <nav
      className={`w-full bg-yellow-500 text-black py-4 px-8 text-center font-semibold text-lg transition-all duration-300 ${
        navbarAtTop ? "fixed top-0 left-0 shadow-lg z-50" : "relative mt-6"
      }`}
    >
      <ul className="flex justify-center space-x-6">
        {["home", "about", "projects", "skills", "contact"].map((section) => (
          <li key={section}>
            <button
              onClick={() => scrollToSection(`${section}-section`)}
              className="px-4 py-2 rounded-md transition-colors duration-200 hover:bg-yellow-600"
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
