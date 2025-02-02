import React from "react";

const Skills = () => {
  return (
    <section id="skills-section" className="p-8">
      <h2 className="text-3xl font-bold mb-4 relative">
        <span
          className="absolute top-7 left-7 w-27 h-2"
          style={{
            backgroundColor: "var(--custom-cyan)", // Use your custom color
            zIndex: -1, // Makes sure the rectangle stays behind the text
            borderRadius: "0", // Sharp corners
          }}
        ></span>
        Skills
      </h2>
    </section>
  );
};

export default Skills;
