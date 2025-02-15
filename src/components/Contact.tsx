import React, { useState } from "react";
import Notification from "./Notification";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    const newErrors: { name?: string; email?: string; message?: string } = {};

    if (email && !email.includes("@")) {
      newErrors.email = "Please include an '@' in the email address.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      newErrors.email = "Invalid email format. Example: example@domain.com";
    }

    if (!name || !email || !message) {
      if (!name) newErrors.name = "Name is required.";
      if (!email) newErrors.email = "Email is required.";
      if (!message) newErrors.message = "Message is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://api.emailjs.com/api/v1.0/email/send",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            service_id: "service_j0o9xtx",
            template_id: "template_6nsegeg",
            user_id: "xBHeyPIKj8OP-VJur",
            template_params: {
              user_name: name,
              user_email: email,
              message: message,
            },
          }),
        }
      );

      if (response.ok) {
        setSuccessMessage("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (error) {
      console.error("Error sending message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact-section"
      className="p-8 mt-60 pb-20 relative"
      style={{ paddingTop: "200px", marginTop: "60px" }}
    >
      <div className="w-full flex justify-center mb-12">
        <button
          className="nav-button animate-fade"
          onClick={() => {
            const projectsSection = document.getElementById("projects-section");
            if (projectsSection) {
              projectsSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          <span className="text-2xl mb-1">&#x25B2;</span> {/* Upward arrow */}
          Projects
        </button>
      </div>
      <h2 className="text-6xl font-bold mb-16 text-center w-full relative">
        <span
          className="absolute top-12 left-[50%] transform -translate-x-[34%] w-52 h-5"
          style={{ backgroundColor: "var(--custom-cyan)", zIndex: -1 }}
        ></span>
        Contact
      </h2>
      <div className="flex flex-col items-center w-full">
        <div className="w-full flex justify-center">
          <p className="text-lg w-full max-w-lg text-left">
            Interested in reaching out to me? Leave a message and I will get
            back to you as soon as possible!
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          noValidate
          className="mt-6 flex flex-col items-center w-full"
        >
          <div className="mb-6 w-full max-w-lg flex justify-center flex-col items-start">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name"
              className={`w-full p-2 rounded bg-[var(--custom-gray)] focus:outline-none focus:ring-2 focus:ring-[var(--custom-cyan)] focus:shadow-[0_0_10px_cyan] transition-shadow ${
                errors.name ? "border-2 border-red-500" : ""
              }`}
            />
            {errors.name && (
              <div className="text-red-500 text-sm mt-1 pl-2">
                {errors.name}
              </div>
            )}
          </div>

          <div className="mb-6 w-full max-w-lg flex justify-center flex-col items-start">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className={`w-full p-2 rounded bg-[var(--custom-gray)] focus:outline-none focus:ring-2 focus:ring-[var(--custom-cyan)] focus:shadow-[0_0_10px_cyan] transition-shadow ${
                errors.email ? "border-2 border-red-500" : ""
              }`}
            />
            {errors.email && (
              <div className="text-red-500 text-sm mt-1 pl-2">
                {errors.email}
              </div>
            )}
          </div>

          <div className="mb-6 w-full max-w-lg flex justify-center flex-col items-start">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Message"
              className={`w-full p-2 rounded bg-[var(--custom-gray)] focus:outline-none focus:ring-2 focus:ring-[var(--custom-cyan)] focus:shadow-[0_0_10px_cyan] transition-shadow ${
                errors.message ? "border-2 border-red-500" : ""
              }`}
              rows={4}
            ></textarea>
            {errors.message && (
              <div className="text-red-500 text-sm mt-1 pl-2">
                {errors.message}
              </div>
            )}
          </div>
          <div className="w-full max-w-lg flex flex-col items-end relative">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`p-2 px-6 bg-[var(--custom-cyan)] font-semibold rounded-lg hover:bg-[var(--hover-cyan)] transition-colors ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>

            {successMessage && (
              <div className="relative w-full flex justify-end">
                <Notification
                  message={successMessage}
                  onClose={() => setSuccessMessage(null)}
                />
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
