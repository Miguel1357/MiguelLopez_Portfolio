import React from "react";
import Navbar from "./components/Navbar"; // Import Navbar
import Home from "./components/Home";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      {/* Home Section */}
      <Home />

      {/* Navbar - Always placed below Home */}
      <Navbar />

      {/* Other sections */}
      <About />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
