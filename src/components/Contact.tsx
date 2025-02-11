import React, { useState, useEffect } from "react";

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

  // Fade out success message after 3 seconds
  useEffect(() => {
    if (notification?.type === "success") {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [notification]);

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Reset error for field being edited
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    // Reset errors first
    const newErrors: { name?: string; email?: string; message?: string } = {};

    // If email is typed but invalid, prioritize email validation errors first
    if (email && !email.includes("@")) {
      newErrors.email = "Please include an '@' in the email address.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      newErrors.email = "Invalid email format. Example: example@domain.com";
    }

    // General empty field check (only triggers if email is either valid or empty)
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
      className="p-8 mt-60 pb-20 relative"
      style={{ paddingTop: "200px", marginTop: "60px" }}
    >
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
          {/* Name Field with Error */}
          <div className="mb-6 w-full max-w-lg flex justify-center flex-col items-start">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name"
              className={`w-full p-2 rounded bg-[var(--custom-gray)] text-white focus:outline-none focus:ring-2 focus:ring-[var(--custom-cyan)] ${
                errors.name ? "border-2 border-red-500" : ""
              }`}
            />
            {errors.name && (
              <div className="text-red-500 text-sm mt-1 pl-2">
                {errors.name}
              </div>
            )}
          </div>

          {/* Email Field with Error */}
          <div className="mb-6 w-full max-w-lg flex justify-center flex-col items-start">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className={`w-full p-2 rounded bg-[var(--custom-gray)] text-white focus:outline-none focus:ring-2 focus:ring-[var(--custom-cyan)] ${
                errors.email ? "border-2 border-red-500" : ""
              }`}
            />
            {errors.email && (
              <div className="text-red-500 text-sm mt-1 pl-2">
                {errors.email}
              </div>
            )}
          </div>

          {/* Message Field with Error */}
          <div className="mb-6 w-full max-w-lg flex justify-center flex-col items-start">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Message"
              className={`w-full p-2 rounded bg-[var(--custom-gray)] text-white focus:outline-none focus:ring-2 focus:ring-[var(--custom-cyan)] ${
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

          {/* Submit Button aligned to the right side of the input boxes */}
          <div className="w-full max-w-lg flex justify-end">
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

        {/* Notification Message below the input fields, aligned to the left and directly to the left of the submit button */}
        {notification && (
          <div
            className={`w-full max-w-lg flex justify-between items-center mt-4 transition-opacity duration-1000 ${
              notification ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className={`${
                notification.type === "error" ? "text-red-500" : "text-white"
              } w-full`}
            >
              {notification.message}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Contact;
