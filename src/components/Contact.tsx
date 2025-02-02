import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://api.emailjs.com/api/v1.0/email/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            service_id: "service_j0o9xtx", // Replace with your Service ID
            template_id: "template_6nsegeg", // Replace with your Template ID
            user_id: "xBHeyPIKj8OP-VJur", // Replace with your User ID
            template_params: {
              user_name: formData.name, // Map 'name' to 'user_name'
              user_email: formData.email, // Map 'email' to 'user_email'
              message: formData.message, // Map 'message' to 'message'
            },
          }),
        }
      );

      if (response.ok) {
        setSubmissionStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmissionStatus("Something went wrong, please try again.");
      }
    } catch (error) {
      setSubmissionStatus("Error sending message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-section" className="p-8">
      <h2 className="text-3xl font-bold mb-4 relative">
        <span
          className="absolute top-7 left-7 w-27 h-2"
          style={{
            backgroundColor: "var(--custom-cyan)", // Use your custom color
            zIndex: -1, // Makes sure the rectangle stays behind the text
            borderRadius: "0", // Sharp corners
          }}
        ></span>
        Contact
      </h2>
      <p className="text-lg">
        Interested in reaching out to me? Leave a message and I will get back to
        you as soon as possible!
      </p>

      <form onSubmit={handleSubmit} className="mt-6">
        <div className="mb-4">
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name"
            className="w-full p-2 rounded-none bg-[var(--custom-gray)] text-white focus:outline-none focus:ring-2 focus:ring-[var(--custom-cyan)]"
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="w-full p-2 rounded-none bg-[var(--custom-gray)] text-white focus:outline-none focus:ring-2 focus:ring-[var(--custom-cyan)]"
            required
          />
        </div>

        <div className="mb-4">
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Message"
            className="w-full p-2 rounded-none bg-[var(--custom-gray)] text-white focus:outline-none focus:ring-2 focus:ring-[var(--custom-cyan)]"
            rows={4}
            required
          ></textarea>
        </div>

        {submissionStatus && <p className="mt-4 text-lg">{submissionStatus}</p>}
        <div className="flex justify-center w-full">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`mt-4 p-2 px-6 bg-[var(--custom-cyan)] text-white rounded-lg hover:bg-[var(--hover-cyan)] transition-colors ${
              isSubmitting ? "opacity-50" : ""
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
