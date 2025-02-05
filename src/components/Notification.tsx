import { useEffect, useState } from "react";

interface NotificationProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  type,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for fade-out animation to finish
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-5 right-5 max-w-xs w-full shadow-lg rounded-lg px-4 py-3 text-white flex justify-between items-center transition-all duration-500 ${
        type === "success" ? "bg-[#055605]" : "bg-[#941A1A]"
      } ${isVisible ? "animate-slideIn" : "animate-fadeOut"}`}
      style={{ zIndex: 9999 }} // Ensure it's above other elements
    >
      <span className="font-medium">{message}</span>
      <button
        onClick={onClose}
        className="relative flex items-center justify-center w-10 h-10 focus:outline-none group"
        aria-label="Close notification"
      >
        {/* Bigger White Rounded Square Background on Hover */}
        <div className="absolute w-8 h-8 bg-transparent rounded-md group-hover:bg-white transition-all duration-300"></div>

        {/* The Bigger Semibold X Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className="group-hover:stroke-[#941A1A] stroke-white transition-colors duration-300 relative z-10"
        >
          <line
            x1="6"
            y1="6"
            x2="18"
            y2="18"
            strokeLinecap="round"
            strokeWidth="3"
          />
          <line
            x1="6"
            y1="18"
            x2="18"
            y2="6"
            strokeLinecap="round"
            strokeWidth="3"
          />
        </svg>
      </button>
    </div>
  );
};

export default Notification;
