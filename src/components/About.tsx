import React from "react";

const About = () => {
  return (
    <section className="p-8">
      <h2 className="text-3xl font-bold mb-4">About</h2>
      <h3 className="text-3xl font-bold mb-4 text-center">Miguel Lopez</h3>
      <h4 className="text-3xl font-bold mb-4 text-center">
        Computer Science Graduate
      </h4>
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
