import { useState, useEffect } from "react";

// Project Images (replace with actual imports)
import image1 from "../assets/project_images/camel1.png";
import image2 from "../assets/project_images/camel2.png";
import image3 from "../assets/project_images/camel3.png";
import image4 from "../assets/project_images/camel4.png";
import image5 from "../assets/project_images/camel5.png";

const Projects = () => {
  // Set up state for image cycle
  const [currentImage, setCurrentImage] = useState(0);

  // Array of images
  const images = [image1, image2, image3, image4, image5];

  // Cycle through images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section id="projects-section" className="p-8">
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

      <div className="bg-[var(--custom-gray)] p-6 rounded-lg shadow-lg max-w-[400px] mx-auto flex flex-col relative overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_var(--custom-cyan)] hover:ring-2 hover:ring-[var(--custom-cyan)] hover:ring-opacity-50">
        <h3 className="text-3xl font-bold text-white">CAMEL</h3>

        <div className="relative mt-4 w-full h-64 overflow-hidden group">
          <button
            onClick={() =>
              setCurrentImage(
                (prev) => (prev - 1 + images.length) % images.length
              )
            }
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            &lt;
          </button>
          <button
            onClick={() =>
              setCurrentImage((prev) => (prev + 1) % images.length)
            }
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            &gt;
          </button>

          <div
            className="flex w-full h-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentImage * 100}%)` }}
          >
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Project screenshot ${index}`}
                className="w-full h-full object-cover rounded-lg"
              />
            ))}
          </div>

          <div className="absolute inset-0 bg-gray-800 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
          <span className="absolute bottom-2 left-2 bg-[var(--custom-cyan)] text-white px-3 py-1 text-xs font-bold rounded">
            AUG, 2023
          </span>
        </div>

        <div className="mt-4 text-white">
          <p className="text-sm mt-2">
            <span className="block font-semibold mb-1 text-white">
              [Project Management Website]
            </span>
            An efficient SaaS platform for Project Managers to streamline
            company finances, projects, and tasks. It supports multiple
            organizations and offers Role-Based Access Control (RBAC) for secure
            and effective business management.
          </p>

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
              >
                {tech}
              </span>
            ))}
          </div>

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
