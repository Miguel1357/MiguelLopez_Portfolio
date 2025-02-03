import React from "react";

// Project Image (Replace with actual import)
import camelProjectImage from "../assets/camel_project.png";

const Projects = () => {
  return (
    <section id="projects-section" className="p-8">
      {/* Section Title */}
      <h2 className="text-3xl font-bold mb-6 relative inline-block">
        Projects
        <span
          className="absolute top-7 left-7 w-24 h-2"
          style={{
            backgroundColor: "var(--custom-cyan)",
            zIndex: -1,
            borderRadius: "0",
          }}
        ></span>
      </h2>

      {/* Project Card */}
      <div className="bg-[var(--custom-gray)] p-6 rounded-lg shadow-lg max-w-xl mx-auto flex flex-col">
        {/* Project Title */}
        <h3 className="text-3xl font-bold text-white">CAMEL</h3>

        {/* Project Image */}
        <div className="relative mt-4">
          <img
            src={camelProjectImage}
            alt="Camel Project"
            className="rounded-lg"
          />
          <span
            className="absolute bottom-2 left-2 bg-[var(--custom-cyan)] text-white px-3 py-1 text-xs font-bold rounded"
            style={{
              backgroundColor: "var(--custom-cyan)",
            }}
          >
            AUG, 2023
          </span>
        </div>

        {/* Project Details */}
        <div className="mt-4 text-white">
          <p className="text-sm mt-2">
            <span className="block font-semibold mb-1 text-white">
              [Project Management]
            </span>
            An efficient SaaS platform for Project Managers to streamline
            company finances, projects, and tasks. It supports multiple
            organizations and offers Role-Based Access Control (RBAC) for secure
            and effective business management.
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mt-4">
            {[
              "TypeScript",
              "React",
              "HTML",
              "Tailwind CSS",
              "Node.js",
              "Next.js",
              "PostgreSQL",
              "Supabase",
            ].map((tech) => (
              <span
                key={tech}
                className="bg-white text-[var(--custom-gray)] px-4 py-2 text-xs font-semibold rounded-full"
                style={{
                  backgroundColor: "white",
                  color: "var(--custom-gray)",
                  borderRadius: "9999px", // fully rounded
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Button */}
          <div className="mt-6 flex space-x-4">
            <a
              href="https://github.com/SacOverflow/CAMEL-Services"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-[var(--custom-cyan)] text-white font-semibold rounded-lg shadow-md hover:bg-[var(--hover-cyan)] transition-all duration-300"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
