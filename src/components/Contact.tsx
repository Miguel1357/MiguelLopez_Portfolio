import React, { useState } from "react";
import Notification from "./Notification"; // Import notification component

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
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior

    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    // If email is typed but invalid, prioritize email validation errors first
    if (email && !email.includes("@")) {
      setNotification({
        message: `Please include an '@' in the email address.`,
        type: "error",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      setNotification({
        message: `Invalid email format. Example: example@domain.com`,
        type: "error",
      });
      return;
    }

    // General empty field check (only triggers if email is either valid or empty)
    if (!name || !email || !message) {
      setNotification({ message: "All fields are required.", type: "error" });
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
        setNotification({
          message: "Message sent successfully!",
          type: "success",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setNotification({
          message: "Something went wrong, please try again.",
          type: "error",
        });
      }
    } catch (error) {
      setNotification({ message: "Error sending message.", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact-section"
      className="p-8 mt-60"
      style={{ paddingTop: "200px", marginTop: "60px" }}
    >
      <h2 className="text-3xl font-bold mb-4 relative">
        <span className="absolute top-7 left-7 w-27 h-2 bg-[var(--custom-cyan)] z-[-1] rounded-none"></span>
        Contact
      </h2>
      <p className="text-lg">
        Interested in reaching out? Leave a message, and I'll get back to you!
      </p>

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <form onSubmit={handleSubmit} noValidate className="mt-6">
        <div className="mb-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name"
            className="w-full p-2 rounded bg-[var(--custom-gray)] text-white focus:outline-none focus:ring-2 focus:ring-[var(--custom-cyan)]"
          />
        </div>

        <div className="mb-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="w-full p-2 rounded bg-[var(--custom-gray)] text-white focus:outline-none focus:ring-2 focus:ring-[var(--custom-cyan)]"
          />
        </div>

        <div className="mb-4">
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Message"
            className="w-full p-2 rounded bg-[var(--custom-gray)] text-white focus:outline-none focus:ring-2 focus:ring-[var(--custom-cyan)]"
            rows={4}
          ></textarea>
        </div>

        <div className="flex justify-center w-full">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`mt-4 p-2 px-6 bg-[var(--custom-cyan)] text-white font-semibold rounded-lg hover:bg-[var(--hover-cyan)] transition-colors ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Contact;
