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

    // Here you can use an API like EmailJS or your own backend
    try {
      // Example using EmailJS (you need to set up EmailJS)
      const response = await fetch("YOUR_EMAILJS_API_URL", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: "YOUR_SERVICE_ID",
          template_id: "YOUR_TEMPLATE_ID",
          user_id: "YOUR_USER_ID",
          template_params: formData,
        }),
      });

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
      <h2 className="text-3xl font-bold mb-4">Contact</h2>
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
            className="w-full p-2 border border-gray-300 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
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
            className="w-full p-2 border border-gray-300 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
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
            className="w-full p-2 border border-gray-300 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            rows={4}
            required
          ></textarea>
        </div>

        {submissionStatus && <p className="mt-4 text-lg">{submissionStatus}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`mt-4 p-2 bg-cyan-500 text-white rounded hover:bg-cyan-400 ${
            isSubmitting ? "opacity-50" : ""
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </section>
  );
};

export default Contact;
