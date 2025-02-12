import { useState, useEffect, useRef } from "react";

// Project Images (replace with actual imports)
import image1 from "../assets/project_images/camel1.png";
import image2 from "../assets/project_images/camel2.png";
import image3 from "../assets/project_images/camel3.png";
import image4 from "../assets/project_images/camel4.png";
import image5 from "../assets/project_images/camel5.png";

const Projects = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [image1, image2, image3, image4, image5];
  const autoScrollRef = useRef<number | null>(null);
  const manualScrollTimeoutRef = useRef<number | null>(null);

  const startAutoScroll = () => {
    autoScrollRef.current = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
  };

  const stopAutoScroll = () => {
    if (autoScrollRef.current !== null) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    }
  };

  const resetAutoScroll = () => {
    stopAutoScroll();
    if (manualScrollTimeoutRef.current !== null) {
      clearTimeout(manualScrollTimeoutRef.current);
    }
    manualScrollTimeoutRef.current = window.setTimeout(startAutoScroll, 5000);
  };

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, []);

  return (
    <section id="projects-section" className="p-8 mt-60">
      <h2 className="text-6xl font-bold mb-16 text-center w-full relative">
        <span className="absolute top-12 left-[50%] transform -translate-x-[35%] w-54 h-5 bg-[var(--custom-cyan)] z-[-1]"></span>
        Projects
      </h2>

      <div
        className="relative bg-[var(--custom-gray)] p-6 rounded-lg shadow-lg w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px] mx-auto flex flex-col overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_var(--custom-cyan)] hover:ring-2 hover:ring-[var(--custom-cyan)] hover:ring-opacity-50 group 
      before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/50 before:to-transparent before:rotate-[-20deg] before:translate-x-[-100%] before:transition-transform before:duration-500 hover:before:translate-x-[200%]"
      >
        <h3 className="text-3xl font-bold text-white">CAMEL</h3>

        <div className="relative mt-4 w-full aspect-[4/3] overflow-hidden">
          <div className="relative w-full h-full flex items-center justify-between">
            {/* Left Arrow */}
            <button
              onClick={() => {
                setCurrentImage(
                  (prev) => (prev - 1 + images.length) % images.length
                );
                resetAutoScroll();
              }}
              className="absolute left-2 text-white text-3xl z-10 bg-[rgba(0,0,0,0.5)] hover:bg-[rgba(0,0,0,0.7)] rounded-full p-2 transition-all duration-300 shadow-md"
            >
              &lt;
            </button>

            {/* Image Carousel */}
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

            {/* Right Arrow */}
            <button
              onClick={() => {
                setCurrentImage((prev) => (prev + 1) % images.length);
                resetAutoScroll();
              }}
              className="absolute right-2 text-white text-3xl z-10 bg-[rgba(0,0,0,0.5)] hover:bg-[rgba(0,0,0,0.7)] rounded-full p-2 transition-all duration-300 shadow-md"
            >
              &gt;
            </button>
          </div>
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
