import React from "react";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text white">
      <header className="p-6 bg-gray-800">
        <h1 className="text-4xl font-bold text-center">
          Miguel Lopez - Web Developer
        </h1>
      </header>
      <About />
      <Projects />
      <Skills />
      <Contact />
    </div>
  );
}

export default App;
