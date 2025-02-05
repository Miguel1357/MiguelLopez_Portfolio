import React, { useState } from "react";
import { motion } from "framer-motion";

// Import skill icons
import pythonIcon from "../assets/skill_icons/python.png";
import javaIcon from "../assets/skill_icons/java.png";
import typescriptIcon from "../assets/skill_icons/typescript.png";
import cssIcon from "../assets/skill_icons/css.png";
import htmlIcon from "../assets/skill_icons/html.png";
import rIcon from "../assets/skill_icons/r.png";
import bashIcon from "../assets/skill_icons/bash.png";
import csharpIcon from "../assets/skill_icons/csharp.png";
import cIcon from "../assets/skill_icons/c.png";
import mysqlIcon from "../assets/skill_icons/mysql.png";

const skills = [
  { name: "PYTHON", icon: pythonIcon },
  { name: "JAVA", icon: javaIcon },
  { name: "TYPESCRIPT", icon: typescriptIcon },
  { name: "CSS", icon: cssIcon },
  { name: "HTML", icon: htmlIcon },
  { name: "R", icon: rIcon },
  { name: "BASH", icon: bashIcon },
  { name: "C#", icon: csharpIcon },
  { name: "C", icon: cIcon },
  { name: "MYSQL", icon: mysqlIcon },
];

const Skills = () => {
  const [hoverEffect, setHoverEffect] = useState<{
    [key: string]: { x: number; y: number };
  }>({});

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    skillName: string
  ) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();

    // Lower movement sensitivity
    const x = -((clientX - left) / width - 0.5) * 300;
    const y = -((clientY - top) / height - 0.5) * 300;

    setHoverEffect((prev) => ({ ...prev, [skillName]: { x, y } }));
  };

  const handleMouseLeave = (skillName: string) => {
    setHoverEffect((prev) => ({ ...prev, [skillName]: { x: 0, y: 0 } }));
  };

  return (
    <section
      id="skills-section"
      className="p-8 mt-60"
      style={{ paddingTop: "200px", marginTop: "60px" }}
    >
      <h2 className="text-3xl font-bold mb-6 relative inline-block">
        Skills
        <span
          className="absolute top-7 left-7 w-27 h-2"
          style={{
            backgroundColor: "var(--custom-cyan)",
            zIndex: -1,
            borderRadius: "0",
          }}
        ></span>
      </h2>

      <div className="flex justify-center mt-6 space-x-6">
        {[0, 3, 7].map((startIdx, columnIndex) => (
          <div
            key={columnIndex}
            className={`flex flex-col items-center space-y-4 ${
              columnIndex === 0 || columnIndex === 2 ? "mt-16" : ""
            }`}
          >
            {skills
              .slice(startIdx, startIdx + (columnIndex === 1 ? 4 : 3))
              .map((skill) => (
                <motion.div
                  key={skill.name}
                  className="flex flex-col items-center bg-[var(--custom-gray)] p-4 rounded-lg shadow-lg w-24 h-24 sm:w-28 sm:h-28 transition-transform"
                  style={{
                    boxShadow:
                      hoverEffect[skill.name]?.x || hoverEffect[skill.name]?.y
                        ? `0 0 10px 3px var(--custom-cyan), 0 0 15px 6px var(--custom-cyan)`
                        : "none",
                  }}
                  onMouseMove={(e) => handleMouseMove(e, skill.name)}
                  onMouseLeave={() => handleMouseLeave(skill.name)}
                  animate={{
                    x: hoverEffect[skill.name]?.x || 0,
                    y: hoverEffect[skill.name]?.y || 0,
                  }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                >
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className="w-12 h-12"
                  />
                  <p className="text-white text-sm mt-2">{skill.name}</p>
                </motion.div>
              ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
