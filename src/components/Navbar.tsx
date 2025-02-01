// Navbar.tsx
import React, { useState, useEffect } from "react";

const Navbar: React.FC = () => {
  const [navbarAtTop, setNavbarAtTop] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const homeHeight =
        document.getElementById("home-section")?.offsetHeight || 0;
      const scrollPosition = window.scrollY;

      if (scrollPosition >= homeHeight) {
        setNavbarAtTop(true);
      } else {
        setNavbarAtTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`w-full bg-yellow-500 text-black py-4 px-8 text-center font-semibold text-lg transition-all duration-300 ${
        navbarAtTop ? "fixed top-0 left-0 shadow-lg z-50" : "relative mt-6"
      }`}
    >
      Navigation Bar
    </nav>
  );
};

export default Navbar;
