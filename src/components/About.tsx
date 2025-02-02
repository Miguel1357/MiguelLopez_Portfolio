import React from "react";

const About = () => {
  return (
    <section id="about-section" className="p-8 mt-60">
      {/* Added mt-20 for spacing */}
      <h2 className="text-3xl font-bold mb-20 relative">
        <span
          className="absolute top-7 left-7 w-27 h-2"
          style={{
            backgroundColor: "var(--custom-cyan)",
            zIndex: -1, // Makes sure the rectangle stays behind the text
            borderRadius: "0", // Sharp corners
          }}
        ></span>
        About
      </h2>
      {/* Image of yourself */}
      <div className="flex justify-center mb-4">
        <img
          src="MiguelJLopez.jpg" // Replace with the actual path to your image
          alt="Miguel Lopez"
          className="w-50 h-50 object-cover mb-7" // Added mb-6 to create space below the image
        />
      </div>
      {/* Name and title */}
      <h3 className="text-4xl font-bold text-center mb-2">Miguel Lopez</h3>{" "}
      {/* Added mb-2 for space between name and title */}
      <h4 className="font-bold mb-4 text-center">Computer Science Graduate</h4>
      {/* About text */}
      <div className="space-y-6 max-w-3xl mx-auto">
        <p className="px-16">
          Hi, I’m Miguel Lopez, a recent Computer Science graduate from
          California State University, Sacramento. I’m fascinated by technology
          and enjoy finding creative ways to improve or reinvent ideas.
        </p>
        <p className="px-16">
          I focus on creating meaningful innovations while appreciating the
          value of small improvements that meet niche needs and make a lasting
          impact.
        </p>
        <p className="mb-15 px-16">
          If you’re looking for someone to help bring your vision to life, let’s
          connect!
        </p>
      </div>
    </section>
  );
};

export default About;
