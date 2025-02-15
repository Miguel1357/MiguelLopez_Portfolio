import { useState } from "react";

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

const About = () => {
  // State to handle hover effects for skills' icons
  const [hoverEffect, setHoverEffect] = useState<
    Record<string, { x: number; y: number }>
  >({});

  return (
    <section
      id="about-section"
      className="p-8 flex flex-col items-center"
      style={{ minHeight: "auto", paddingTop: "100px", marginTop: "60px" }}
    >
      <div className="w-full flex justify-center mb-12">
        <button
          className="nav-button animate-fade"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <span className="text-2xl mb-1">&#x25B2;</span> {/* Upward arrow */}
          Home
        </button>
      </div>
      <h2 className="text-6xl font-bold mb-16 text-center w-full relative">
        <span
          className="absolute top-12 left-[50%] transform -translate-x-[28%] w-40 h-5"
          style={{ backgroundColor: "var(--custom-cyan)", zIndex: -1 }}
        ></span>
        About
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-screen-xl mx-auto">
        {/* About Section */}
        <div className="flex flex-col items-center text-center mx-auto lg:max-w-md">
          <img
            src="MiguelJLopez.jpg"
            alt="Miguel Lopez"
            className="w-50 h-50 object-cover mb-7 rounded-full"
          />
          <h3 className="text-4xl font-bold text-center mb-2">Miguel Lopez</h3>
          <h4 className="font-bold mb-4 text-center">
            Computer Science Graduate
          </h4>
          <div className="space-y-6 max-w-2xl mx-auto">
            <p className="px-20 text-left">
              Hi, I’m Miguel Lopez, a recent Computer Science graduate from
              California State University, Sacramento. I’m fascinated by
              technology and enjoy finding creative ways to improve or reinvent
              ideas.
            </p>
            <p className="px-20 text-left">
              I focus on creating meaningful innovations while appreciating the
              value of small improvements that meet niche needs and make a
              lasting impact.
            </p>
            <p className="mb-15 px-20 text-left">
              If you’re looking for someone to help bring your vision to life,
              let’s connect!
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center mx-auto lg:max-w-md">
          {/* Skills Section */}
          <div className="flex justify-center space-x-6">
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
                    <div
                      key={skill.name}
                      className="flex flex-col items-center bg-[var(--custom-gray)] p-4 rounded-lg shadow-lg w-24 h-24 sm:w-28 sm:h-28 transition-transform hover:border-[var(--custom-cyan)] border-2 border-transparent"
                      style={{
                        boxShadow:
                          hoverEffect[skill.name]?.x ||
                          hoverEffect[skill.name]?.y
                            ? `0 0 10px 3px var(--custom-cyan), 0 0 15px 6px var(--custom-cyan)`
                            : "none",
                        transform: `translate(${
                          hoverEffect[skill.name]?.x || 0
                        }px, ${hoverEffect[skill.name]?.y || 0}px)`, // Moves the box
                        transition: "transform 0.2s ease-out",
                      }}
                      onMouseMove={(e) => {
                        const { clientX, clientY, currentTarget } = e;
                        const { left, top, width, height } =
                          currentTarget.getBoundingClientRect();
                        const x = -((clientX - left) / width - 0.5) * 20;
                        const y = -((clientY - top) / height - 0.5) * 20;
                        setHoverEffect((prev) => ({
                          ...prev,
                          [skill.name]: { x, y },
                        }));
                      }}
                      onMouseLeave={() =>
                        setHoverEffect((prev) => ({
                          ...prev,
                          [skill.name]: { x: 0, y: 0 }, // Reset position on hover leave
                        }))
                      }
                    >
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className="w-12 h-12"
                      />
                      <p className="text-sm mt-2">{skill.name}</p>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center mt-12">
        <button
          className="nav-button animate-fade"
          onClick={() => {
            const projectsSection = document.getElementById("projects-section");
            if (projectsSection) {
              projectsSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          Projects
          <span className="text-2xl mt-1">&#x25BC;</span> {/* Downward arrow */}
        </button>
      </div>
    </section>
  );
};

export default About;
